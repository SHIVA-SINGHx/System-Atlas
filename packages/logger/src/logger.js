"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceLogger = createServiceLogger;
const pino_1 = __importDefault(require("pino"));
const redact_1 = require("./redact");
function createServiceLogger(opts) {
    const isDev = opts.isDev ?? process.env['NODE_ENV'] !== 'production';
    const baseConfig = {
        name: opts.serviceName,
        level: opts.level || (isDev ? 'debug' : 'info'),
        formatters: {
            level(label) {
                return { level: label };
            },
        },
        timestamp: pino_1.default.stdTimeFunctions.isoTime,
        redact: {
            paths: redact_1.REDACTED_KEYS,
            censor: '[REDACTED_SENSITIVE]',
        },
    };
    if (isDev) {
        return (0, pino_1.default)({
            ...baseConfig,
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                },
            },
        });
    }
    return (0, pino_1.default)(baseConfig);
}
//# sourceMappingURL=logger.js.map