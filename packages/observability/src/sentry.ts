import * as Sentry from '@sentry/node';

export function initSentry(serviceName: string): void {
  const dsn = process.env['SENTRY_DSN'];
  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    serverName: serviceName,
    environment: process.env['NODE_ENV'] || 'development',
    tracesSampleRate: process.env['NODE_ENV'] === 'production' ? 0.2 : 1.0,
    sendDefaultPii: false,
    beforeSend(event) {
      if (event.request?.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
        delete event.request.headers['x-service-secret'];
      }
      return event;
    },
  });
}
