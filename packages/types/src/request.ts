export interface RequestContext {
  correlationId: string;
  userId?: string;
  userEmail?: string;
  organizationId?: string;
  organizationRole?: 'owner' | 'admin' | 'member';
  roles: string[];
  ip: string;
  userAgent: string;
}

export interface ServiceHeaders {
  'x-correlation-id': string;
  'x-service-identity'?: string;
  'x-service-secret'?: string;
  'x-user-id'?: string;
  'x-org-id'?: string;
}
