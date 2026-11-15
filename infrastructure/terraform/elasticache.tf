resource "aws_elasticache_subnet_group" "main" {
  name       = "system-atlas-${var.environment}-cache-subnets"
  subnet_ids = []
}
