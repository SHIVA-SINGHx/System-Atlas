import { Logger } from 'pino';
export interface CreateLoggerOptions {
    serviceName: string;
    level?: string;
    isDev?: boolean;
}
export declare function createServiceLogger(opts: CreateLoggerOptions): Logger;
//# sourceMappingURL=logger.d.ts.map