# Contracts & DTO Guidelines

All API data models, requests, responses, and cross-service contracts are defined in `@system-atlas/contracts`.

## Package Location
`packages/contracts/src`

## Core Modules
- `common`: Standard `ApiResponse<T>`, `PaginationQuerySchema`, `ErrorCode`
- `auth`: UserProfile, UpdateProfileDto, SyncClerkUserDto
- `learning`: Topic, Lesson, DifficultyLevel
- `progress`: LessonProgress, Bookmark, UserLearningStats
- `playground`: ArchitectureProject, SimulationRequest
- `interview`: InterviewProblem, QueryInterviewProblems
- `resource`: Resource, ResourceCategory
- `organization`: Organization, OrgMembership, OrgRole
- `notification`: Notification, NotificationType, SendNotificationJobPayload

## Validation Pipe
Services apply `ZodValidationPipe` from `@system-atlas/validation` to enforce Zod schemas at controller boundaries.
