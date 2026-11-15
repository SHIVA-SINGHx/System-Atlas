export interface TenantContext {
  organizationId: string;
  role: 'owner' | 'admin' | 'member';
  isTenantAdmin: boolean;
}
