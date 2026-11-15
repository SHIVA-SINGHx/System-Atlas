resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "system-atlas-${var.environment}-vpc"
  }
}

resource "aws_ecs_cluster" "main" {
  name = "system-atlas-${var.environment}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
