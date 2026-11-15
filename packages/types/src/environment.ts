export type Environment = 'development' | 'test' | 'staging' | 'production';

export interface BaseServiceConfig {
  port: number;
  nodeEnv: Environment;
  serviceName: string;
  serviceVersion: string;
}
