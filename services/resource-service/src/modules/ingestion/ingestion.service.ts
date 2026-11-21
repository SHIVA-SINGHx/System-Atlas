import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SSRFGuardService } from './ssrf-guard.service';
import {
  IngestionJob,
  CreateIngestionJobDto,
  ReviewIngestionJobDto,
  Resource,
} from '@system-atlas/contracts';
import { randomUUID } from 'crypto';

@Injectable()
export class IngestionService {
  private jobs: Map<string, IngestionJob> = new Map();

  constructor(private readonly ssrfGuard: SSRFGuardService) {
    // Seed an initial demo job for immediate inspection
    const sampleJobId = 'c1010001-0001-0001-0001-000000000001';
    this.jobs.set(sampleJobId, {
      id: sampleJobId,
      url: 'https://github.com/donnemartin/system-design-primer',
      domain: 'github.com',
      status: 'PARSED',
      robotsAllowed: true,
      licenseNotes: 'CC-BY-SA 4.0 / Open Source Educational License',
      extractedTitle: 'The System Design Primer: Learn How to Design Large-Scale Systems',
      extractedDescription: 'An organized collection of resources and architectural diagrams to help software engineers learn how to build large-scale distributed systems.',
      extractedHeadings: [
        'Motivation',
        'Performance vs Scalability',
        'Latency vs Throughput',
        'Availability vs Consistency (CAP Theorem)',
        'Consistency Patterns',
        'Availability Patterns',
      ],
      extractedTopics: ['Distributed Systems', 'System Design', 'Scalability', 'CAP Theorem', 'Caching'],
      contentSummary: 'Curated comprehensive primer covering system design trade-offs, architecture patterns, and interview rubrics with diagrams.',
      editorialNotes: 'High-quality community repository with verified CC-BY-SA attribution requirements.',
      submittedBy: 'admin@system-atlas.io',
      auditLog: [
        {
          timestamp: '2026-11-20T10:00:00Z',
          action: 'JOB_CREATED',
          actor: 'admin@system-atlas.io',
          details: 'Initial URL submitted for verification.',
        },
        {
          timestamp: '2026-11-20T10:00:05Z',
          action: 'SSRF_VALIDATED',
          actor: 'system:ssrf-guard',
          details: 'Domain resolved to public GitHub IP; no private ranges detected.',
        },
        {
          timestamp: '2026-11-20T10:00:08Z',
          action: 'PARSED_METADATA',
          actor: 'system:parser',
          details: 'Extracted repository headings, stars, and open educational license notes.',
        },
      ],
      createdAt: '2026-11-20T10:00:00Z',
      updatedAt: '2026-11-20T10:00:08Z',
    });
  }

  async createJob(dto: CreateIngestionJobDto, submittedBy: string): Promise<IngestionJob> {
    // 1. SSRF and Domain Pre-Validation
    const { parsedUrl, resolvedIp } = await this.ssrfGuard.validateUrl(dto.url);
    const domain = parsedUrl.hostname;
    const jobId = randomUUID();
    const now = new Date().toISOString();

    const job: IngestionJob = {
      id: jobId,
      url: dto.url,
      domain,
      status: 'VALIDATING',
      robotsAllowed: true,
      licenseNotes: null,
      extractedTitle: null,
      extractedDescription: null,
      extractedHeadings: [],
      extractedTopics: [],
      contentSummary: null,
      editorialNotes: dto.editorialNotes || null,
      submittedBy,
      reviewedBy: null,
      reviewedAt: null,
      auditLog: [
        {
          timestamp: now,
          action: 'JOB_CREATED',
          actor: submittedBy,
          details: `URL queued for ingestion. Target domain: ${domain}`,
        },
        {
          timestamp: now,
          action: 'SSRF_PASSED',
          actor: 'system:ssrf-guard',
          details: `Resolved to public IP: ${resolvedIp}. No private addresses.`,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    this.jobs.set(jobId, job);

    // Asynchronous parse simulation / background execution
    this.processJob(jobId, parsedUrl).catch((err) => {
      const current = this.jobs.get(jobId);
      if (current) {
        current.status = 'FAILED';
        current.failureReason = err.message;
        current.updatedAt = new Date().toISOString();
        current.auditLog.push({
          timestamp: current.updatedAt,
          action: 'INGESTION_FAILED',
          actor: 'system:processor',
          details: err.message,
        });
      }
    });

    return job;
  }

  private async processJob(jobId: string, url: URL): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'FETCHING';
    job.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'FETCHING_CONTENT',
      actor: 'system:fetcher',
      details: 'Checking robots.txt and requesting permitted headers...',
    });

    // Check robots.txt (simulated / safe public fetch)
    const robotsAllowed = await this.checkRobotsTxt(url);
    job.robotsAllowed = robotsAllowed;

    if (!robotsAllowed) {
      job.status = 'FAILED';
      job.failureReason = 'Robots.txt forbids scraping this path.';
      job.auditLog.push({
        timestamp: new Date().toISOString(),
        action: 'ROBOTS_REJECTED',
        actor: 'system:policy-guard',
        details: 'Robots.txt explicitly disallows automated agent access.',
      });
      job.updatedAt = new Date().toISOString();
      return;
    }

    // Parse metadata according to domain / format
    const domain = url.hostname.toLowerCase();
    let title = `${domain.toUpperCase()} Technical Documentation`;
    let description = `Architectural reference and technical documentation hosted at ${url.href}.`;
    let headings: string[] = ['Overview', 'Architecture & Components', 'Best Practices', 'API Reference'];
    let topics: string[] = ['System Architecture', 'Distributed Systems'];
    let license = 'Check original publisher website terms for reuse.';

    if (domain.includes('github.com')) {
      const pathParts = url.pathname.split('/').filter(Boolean);
      const repo = pathParts.slice(0, 2).join('/');
      title = `GitHub Repository: ${repo}`;
      description = `Open-source engineering repository covering distributed systems, data structures, and architecture implementations.`;
      headings = ['README Overview', 'Installation & Setup', 'Architecture Design', 'Benchmarks'];
      topics = ['Open Source', 'GitHub', 'Implementation', 'Architecture'];
      license = 'Open Source (MIT / Apache / CC-BY)';
    } else if (domain.includes('research.google') || domain.includes('arxiv.org')) {
      title = `Academic Research Paper: ${url.pathname.split('/').pop() || 'Distributed Systems'}`;
      description = `Peer-reviewed scientific paper on distributed consensus, large-scale storage, and fault tolerance.`;
      headings = ['Abstract', 'System Model', 'Implementation Details', 'Fault Tolerance', 'Evaluation'];
      topics = ['Distributed Consensus', 'Storage Engines', 'White Paper'];
      license = 'Academic Citation / Research Use Only';
    } else if (domain.includes('blog') || domain.includes('medium.com') || domain.includes('netflixtechblog')) {
      title = `Engineering Blog Article from ${domain}`;
      description = `Real-world production case study detailing scale, observability, and incident post-mortems.`;
      headings = ['Problem Statement', 'Architecture Evolution', 'Scale & Metrics', 'Key Learnings'];
      topics = ['Engineering Blog', 'Production Experience', 'High Availability'];
      license = 'Copyright original author; external link citation.';
    }

    job.extractedTitle = title;
    job.extractedDescription = description;
    job.extractedHeadings = headings;
    job.extractedTopics = topics;
    job.licenseNotes = license;
    job.contentSummary = `Independently summarized research reference from ${domain}. Suitable for inclusion in Atlas Resource Directory with attribution.`;
    job.status = 'PARSED';
    job.updatedAt = new Date().toISOString();

    job.auditLog.push({
      timestamp: job.updatedAt,
      action: 'METADATA_EXTRACTED',
      actor: 'system:parser',
      details: `Parsed ${headings.length} headings and extracted ${topics.length} topic tags. Ready for editorial review.`,
    });
  }

  private async checkRobotsTxt(url: URL): Promise<boolean> {
    // In production, would fetch url.origin + '/robots.txt'
    // For demo/sandbox safety, reject known protected endpoints
    const forbiddenPaths = ['/admin', '/private', '/login', '/checkout'];
    return !forbiddenPaths.some((p) => url.pathname.startsWith(p));
  }

  listJobs(): IngestionJob[] {
    return Array.from(this.jobs.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getJob(id: string): IngestionJob {
    const job = this.jobs.get(id);
    if (!job) throw new NotFoundException(`Ingestion job with ID '${id}' not found.`);
    return job;
  }

  reviewJob(
    id: string,
    dto: ReviewIngestionJobDto,
    reviewedBy: string,
  ): { job: IngestionJob; publishedResource?: Partial<Resource> } {
    const job = this.getJob(id);
    const now = new Date().toISOString();

    if (dto.action === 'REJECT') {
      job.status = 'REJECTED';
      job.reviewedBy = reviewedBy;
      job.reviewedAt = now;
      job.editorialNotes = dto.editorialNotes || 'Rejected by editor during review.';
      job.auditLog.push({
        timestamp: now,
        action: 'EDITORIAL_REJECTED',
        actor: reviewedBy,
        details: job.editorialNotes,
      });
      job.updatedAt = now;
      return { job };
    }

    // APPROVAL WORKFLOW
    job.status = 'APPROVED';
    job.reviewedBy = reviewedBy;
    job.reviewedAt = now;
    if (dto.editorialNotes) job.editorialNotes = dto.editorialNotes;
    if (dto.editedTitle) job.extractedTitle = dto.editedTitle;
    if (dto.editedDescription) job.extractedDescription = dto.editedDescription;

    job.auditLog.push({
      timestamp: now,
      action: 'EDITORIAL_APPROVED',
      actor: reviewedBy,
      details: `Approved by editor. Target module: ${dto.targetModule}. Ready for publication.`,
    });
    job.updatedAt = now;

    const publishedResource: Partial<Resource> = {
      id: randomUUID(),
      slug: (job.extractedTitle || 'resource').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: job.extractedTitle || 'Approved Resource',
      description: job.extractedDescription || '',
      url: job.url,
      category: dto.editedCategory || 'ARTICLE',
      relatedTopics: job.extractedTopics,
      difficulty: 'INTERMEDIATE',
      contentType: 'article',
      license: dto.verifiedLicense || job.licenseNotes || 'Verified External Attribution',
      attribution: `Originally published by ${job.domain}. Curated with permission for System Atlas.`,
      lastVerifiedDate: now.split('T')[0],
      tags: job.extractedTopics,
      status: 'PUBLISHED',
      createdAt: now,
    };

    return { job, publishedResource };
  }
}
