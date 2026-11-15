resource "aws_db_subnet_group" "main" {
  name        = "system-atlas-${var.environment}-db-subnets"
  subnet_ids  = []
  description = "Private DB Subnet Group for PostgreSQL Microservices"
}
