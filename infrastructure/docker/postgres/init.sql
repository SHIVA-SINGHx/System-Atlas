-- System Atlas Database Initialization
-- Strict Domain Isolation: Each microservice owns its schema with dedicated credentials

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Create Dedicated Service Schemas
CREATE SCHEMA IF NOT EXISTS auth_service;
CREATE SCHEMA IF NOT EXISTS learning_service;
CREATE SCHEMA IF NOT EXISTS progress_service;
CREATE SCHEMA IF NOT EXISTS playground_service;
CREATE SCHEMA IF NOT EXISTS interview_service;
CREATE SCHEMA IF NOT EXISTS resource_service;
CREATE SCHEMA IF NOT EXISTS organization_service;
CREATE SCHEMA IF NOT EXISTS notification_service;

-- 2. Create Dedicated Service Roles (Least Privilege)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'auth_user') THEN
    CREATE ROLE auth_user WITH LOGIN PASSWORD 'auth_dev_pwd';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'learning_user') THEN
    CREATE ROLE learning_user WITH LOGIN PASSWORD 'learning_dev_pwd';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'progress_user') THEN
    CREATE ROLE progress_user WITH LOGIN PASSWORD 'progress_dev_pwd';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'playground_user') THEN
    CREATE ROLE playground_user WITH LOGIN PASSWORD 'playground_dev_pwd';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'interview_user') THEN
    CREATE ROLE interview_user WITH LOGIN PASSWORD 'interview_dev_pwd';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'resource_user') THEN
    CREATE ROLE resource_user WITH LOGIN PASSWORD 'resource_dev_pwd';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'organization_user') THEN
    CREATE ROLE organization_user WITH LOGIN PASSWORD 'organization_dev_pwd';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'notification_user') THEN
    CREATE ROLE notification_user WITH LOGIN PASSWORD 'notification_dev_pwd';
  END IF;
END
$$;

-- 3. Grant Strict Ownership & Permissions (Zero Cross-Schema Querying)
GRANT ALL ON SCHEMA auth_service TO auth_user;
GRANT ALL ON SCHEMA learning_service TO learning_user;
GRANT ALL ON SCHEMA progress_service TO progress_user;
GRANT ALL ON SCHEMA playground_service TO playground_user;
GRANT ALL ON SCHEMA interview_service TO interview_user;
GRANT ALL ON SCHEMA resource_service TO resource_user;
GRANT ALL ON SCHEMA organization_service TO organization_user;
GRANT ALL ON SCHEMA notification_service TO notification_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA auth_service GRANT ALL ON TABLES TO auth_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA learning_service GRANT ALL ON TABLES TO learning_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA progress_service GRANT ALL ON TABLES TO progress_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA playground_service GRANT ALL ON TABLES TO playground_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA interview_service GRANT ALL ON TABLES TO interview_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA resource_service GRANT ALL ON TABLES TO resource_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA organization_service GRANT ALL ON TABLES TO organization_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA notification_service GRANT ALL ON TABLES TO notification_user;
