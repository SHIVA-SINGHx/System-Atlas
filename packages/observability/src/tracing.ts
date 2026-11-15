import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

let sdkInstance: NodeSDK | null = null;

export function initOpenTelemetry(serviceName: string, serviceVersion = '0.1.0'): void {
  const otlpEndpoint = process.env['OTEL_EXPORTER_OTLP_ENDPOINT'];
  if (!otlpEndpoint) {
    return;
  }

  sdkInstance = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: serviceName,
      [SEMRESATTRS_SERVICE_VERSION]: serviceVersion,
      'deployment.environment': process.env['NODE_ENV'] || 'development',
    }),
    traceExporter: new OTLPTraceExporter({
      url: `${otlpEndpoint}/v1/traces`,
    }),
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  });

  sdkInstance.start();

  process.on('SIGTERM', () => {
    sdkInstance?.shutdown().finally(() => process.exit(0));
  });
}
