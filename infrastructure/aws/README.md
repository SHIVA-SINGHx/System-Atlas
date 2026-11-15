# AWS Infrastructure Deployment Guide

## Production Topology
- **Amazon ECS (Fargate)**: Serverless container execution for API Gateway and all NestJS domain microservices.
- **Amazon RDS (PostgreSQL 16 Multi-AZ)**: High-availability managed relational database with automated backups and read replicas.
- **Amazon ElastiCache for Redis (Cluster Mode)**: Low-latency distributed caching and rate-limiting cluster.
- **AWS Application Load Balancer (ALB)**: Public edge SSL termination routing traffic directly to the API Gateway tasks.
- **Amazon CloudWatch & OpenTelemetry**: Container metrics and distributed tracing collector pipeline.

## Provisioning via Terraform
```bash
cd infrastructure/terraform
terraform init
terraform plan -var="environment=production"
terraform apply -var="environment=production"
```
