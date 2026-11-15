import pino, { Logger, LoggerOptions } from 'pino';
import { REDACTED_KEYS } from './redact';

export interface CreateLoggerOptions {
  serviceName: string;
  level?: string;
  isDev?: boolean;
}

export function createServiceLogger(opts: CreateLoggerOptions): Logger {
  const isDev = opts.isDev ?? process.env['NODE_ENV'] !== 'production';

  const baseConfig: LoggerOptions = {
    name: opts.serviceName,
    level: opts.level || (isDev ? 'debug' : 'info'),
    formatters: {
      level(label) {
        return { level: label };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: REDACTED_KEYS,
      censor: '[REDACTED_SENSITIVE]',
    },
  };

  if (isDev) {
    return pino({
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

  return pino(baseConfig);
}
