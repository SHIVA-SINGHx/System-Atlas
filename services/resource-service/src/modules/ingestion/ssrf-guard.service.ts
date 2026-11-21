import { Injectable, BadRequestException } from '@nestjs/common';
import * as dns from 'dns/promises';
import * as net from 'net';

@Injectable()
export class SSRFGuardService {
  private readonly BLOCKED_IP_PREFIXES = [
    '127.',        // Loopback
    '10.',         // Private RFC 1918 Class A
    '172.16.',     // Private RFC 1918 Class B
    '172.17.',
    '172.18.',
    '172.19.',
    '172.20.',
    '172.21.',
    '172.22.',
    '172.23.',
    '172.24.',
    '172.25.',
    '172.26.',
    '172.27.',
    '172.28.',
    '172.29.',
    '172.30.',
    '172.31.',
    '192.168.',    // Private RFC 1918 Class C
    '169.254.',    // Link-local / AWS / GCP / Azure Metadata service (169.254.169.254)
    '0.',          // Current network
  ];

  private readonly FORBIDDEN_HOSTNAMES = [
    'localhost',
    'metadata.google.internal',
    'instance-data',
    '169.254.169.254',
  ];

  async validateUrl(urlString: string): Promise<{ resolvedIp: string; parsedUrl: URL }> {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(urlString);
    } catch {
      throw new BadRequestException('Invalid URL format.');
    }

    // Protocol check: only http and https allowed
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new BadRequestException('Only HTTP and HTTPS protocols are permitted.');
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    // Hostname check
    if (this.FORBIDDEN_HOSTNAMES.includes(hostname) || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
      throw new BadRequestException(`Access to internal host '${hostname}' is prohibited (SSRF Protection).`);
    }

    // Direct IP format check
    if (net.isIP(hostname)) {
      if (this.isPrivateOrRestrictedIp(hostname)) {
        throw new BadRequestException(`Direct access to private/restricted IP '${hostname}' is prohibited.`);
      }
      return { resolvedIp: hostname, parsedUrl };
    }

    // DNS Resolution Check (prevents DNS rebinding and internal network routing)
    try {
      const lookupResult = await dns.lookup(hostname, { all: true });
      if (!lookupResult || lookupResult.length === 0) {
        throw new BadRequestException(`Could not resolve hostname '${hostname}'.`);
      }

      for (const entry of lookupResult) {
        if (this.isPrivateOrRestrictedIp(entry.address)) {
          throw new BadRequestException(
            `Hostname '${hostname}' resolved to prohibited IP '${entry.address}' (SSRF Protection).`,
          );
        }
      }

      return { resolvedIp: lookupResult[0]!.address, parsedUrl };
    } catch (err: any) {
      if (err instanceof BadRequestException) throw err;
      throw new BadRequestException(`DNS resolution failed for '${hostname}': ${err.message}`);
    }
  }

  isPrivateOrRestrictedIp(ip: string): boolean {
    if (ip === '::1' || ip === '0.0.0.0' || ip === '::') {
      return true;
    }

    // IPv6 private/link-local check
    if (ip.includes(':')) {
      const lower = ip.toLowerCase();
      if (lower.startsWith('fe80:') || lower.startsWith('fc00:') || lower.startsWith('fd00:')) {
        return true;
      }
      return false;
    }

    // IPv4 checks
    for (const prefix of this.BLOCKED_IP_PREFIXES) {
      if (ip.startsWith(prefix)) {
        return true;
      }
    }

    return false;
  }
}
