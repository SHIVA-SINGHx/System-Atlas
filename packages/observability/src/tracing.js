"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOpenTelemetry = initOpenTelemetry;
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
let sdkInstance = null;
function initOpenTelemetry(serviceName, serviceVersion = '0.1.0') {
    const otlpEndpoint = process.env['OTEL_EXPORTER_OTLP_ENDPOINT'];
    if (!otlpEndpoint) {
        return;
    }
    sdkInstance = new sdk_node_1.NodeSDK({
        resource: new resources_1.Resource({
            [semantic_conventions_1.SEMRESATTRS_SERVICE_NAME]: serviceName,
            [semantic_conventions_1.SEMRESATTRS_SERVICE_VERSION]: serviceVersion,
            'deployment.environment': process.env['NODE_ENV'] || 'development',
        }),
        traceExporter: new exporter_trace_otlp_http_1.OTLPTraceExporter({
            url: `${otlpEndpoint}/v1/traces`,
        }),
        instrumentations: [
            (0, auto_instrumentations_node_1.getNodeAutoInstrumentations)({
                '@opentelemetry/instrumentation-fs': { enabled: false },
            }),
        ],
    });
    sdkInstance.start();
    process.on('SIGTERM', () => {
        sdkInstance?.shutdown().finally(() => process.exit(0));
    });
}
//# sourceMappingURL=tracing.js.map