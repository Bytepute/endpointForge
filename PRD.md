# Endpoint Forge PRD

Last reviewed: 2026-05-30

## Product Summary

Endpoint Forge is a developer tool for creating realistic mock APIs before a production backend is available or stable. It helps frontend developers and product teams build, test, and demo UI flows by defining mock API projects, route groups, endpoints, HTTP methods, response status codes, artificial delay, and JSON response bodies through a web interface.

The current application is a React frontend that talks to an external API service. It provides a public bilingual landing page, authentication, tenant-based dashboard routing, project management, route-group/controller management, endpoint management, mock server start/stop controls, and basic profile/account management.

## Core Goal

Help developers keep frontend work moving while backend contracts are incomplete, changing, or unavailable.

Endpoint Forge should make it fast to:

- Create a mock API workspace for a product, feature, demo, or test scenario.
- Organize mock routes in a way that resembles real backend structure.
- Define responses that frontend code can call immediately.
- Start a project-level mock server and use its generated endpoint URLs.
- Iterate on endpoint behavior without touching backend code.

## User Problem

Frontend development often blocks on backend availability. Teams may need to design screens, handle loading and error states, prepare demos, or validate API contracts before backend endpoints exist. Common alternatives such as static fixtures, scattered local JSON files, ad hoc mock servers, or hardcoded responses are difficult to share, organize, and evolve.

Endpoint Forge solves this by providing a UI-managed mock API layer where users can model API surfaces close to production expectations and expose them through a runnable mock server.

## Target Users

- Frontend developers building UI flows before backend endpoints are ready.
- Full-stack developers prototyping API contracts.
- QA engineers who need predictable API states for manual or automated testing.
- Product/demo owners who need realistic responses for demos.
- Small teams that want a lightweight mock API workbench without building custom mock servers.

## Primary Value Proposition

"Ship frontend flows before the backend exists."

The product promise in the current landing page is that users can create realistic mock APIs for testing, demos, and contract experiments without touching backend code. The implementation supports this through a project -> controller -> endpoint hierarchy and project-level mock server lifecycle controls.

## Product Model

### Project

A project is the top-level workspace for a mock API surface. It groups routes for a product, feature, demo, or test scenario.

Current project attributes:

- `id`
- `name`
- `description`
- `createdAt`
- `port`
- `isProjectRunning`

Current project capabilities:

- Create project.
- List all projects for the authenticated user/tenant.
- View project details.
- Update project name and description.
- Delete project.
- Start mock server.
- Stop mock server.
- See assigned mock server port and running/stopped status.

### Controller / Route Group

A controller is a route group under a project. It represents a base path such as `/users`, `/products`, or `/orders`.

Current controller attributes:

- `id`
- `projectId`
- `name`
- `basePath`
- `createdAt`
- `endpoints`

Current controller capabilities:

- Create controller by defining a base path.
- List controllers by project.
- View controller details.
- Delete controller.
- Navigate from the sidebar into each controller.

Current implementation note: the frontend model includes `endpoints`, but controller service currently maps this to an empty array because the backend response does not include endpoint counts yet.

### Endpoint

An endpoint belongs to a controller/route group and defines the mock behavior for a route.

Current endpoint attributes:

- `id`
- `routeGroupId`
- `method`: `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`
- `path`
- `statusCode`
- `delay`
- `responseBody`
- `createdAt`
- `updatedAt`

Current endpoint capabilities:

- Create endpoint.
- List endpoints by controller.
- View endpoint details.
- Edit endpoint.
- Delete endpoint.
- Configure method, relative path, status code, response JSON, and artificial delay.
- Copy a mock URL from the endpoint detail header.

## Key User Workflows

### First-Time User Flow

1. User lands on the bilingual public marketing page.
2. User reads the product promise and workflow.
3. User clicks "Create mock API".
4. If unauthenticated, the register modal opens.
5. User registers with username and password.
6. App receives an access token and redirects to the user's tenant dashboard.
7. User creates the first project.
8. User creates a controller/base path.
9. User creates endpoints with method, path, status code, delay, and JSON response.
10. User starts the mock server.
11. User points frontend code or test tools at the mock API URL.

### Returning User Flow

1. User logs in from the landing page.
2. App redirects to `username.app-domain/projects`.
3. User browses projects in the dashboard sidebar.
4. User opens a project, starts/stops its mock server, and manages controllers/endpoints.
5. If the access token expires, the API client attempts refresh; if refresh fails, the user is redirected out of the tenant dashboard.

### Mock Endpoint Creation Flow

1. User opens a project.
2. User creates or opens a controller with a base path.
3. User opens "Create Endpoint".
4. User chooses HTTP method.
5. User enters a route path beginning with `/`.
6. User enters a numeric status code.
7. User enters valid JSON in a CodeMirror editor.
8. User optionally sets response delay in milliseconds.
9. Endpoint is saved to the backend and appears in the endpoint table/sidebar.

### Account Management Flow

1. User opens profile from the dashboard sidebar/footer.
2. User can update username.
3. User can log out.
4. User can delete account after confirmation.

## Current Screens and Navigation

- `/`: public landing page with bilingual English/Persian content, feature section, workflow section, support/donate section, login/register modals, and language toggle.
- `/projects`: authenticated tenant dashboard project list.
- `/projects/profile`: profile/account settings.
- `/projects/$projectId`: project detail, mock server controls, controller list.
- `/projects/$projectId/controllers/$controllerId`: controller detail and endpoint table.
- `/projects/$projectId/controllers/$controllerId/endpoints/$endpointId`: endpoint detail page with response preview and edit/delete actions.

Dashboard routes are protected by two checks:

- User must have an access token in the auth store.
- User must be on a tenant subdomain.

If either condition fails, the app redirects to the root domain.

## Authentication and Tenant Model

Endpoint Forge uses username-based tenant URLs. After login or registration, the app redirects users to:

```text
{protocol}://{username}.{app-domain}{optional-port}/projects
```

In local/docker-oriented config, the app supports `lvh.me` for subdomain testing.

Auth behavior:

- Login and registration call `/auth/login` and `/auth/register`.
- Access token is kept in the Zustand auth store.
- Refresh token appears to be stored by the backend through HTTP-only cookies because auth requests use `withCredentials`.
- Axios attaches the access token to authenticated API calls.
- On 401, the client tries `/auth/refresh-token` once and retries the failed request.
- If refresh fails, the session is marked expired and the user is redirected away from protected tenant routes.

## API Integration

The frontend expects a backend API at `VITE_API_URL`.

Current API surface used by the frontend:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh-token`
- `GET /projects`
- `POST /projects`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `DELETE /projects/:id`
- `POST /mock/start/:id`
- `POST /mock/stop/:id`
- `GET /route-groups/project/:projectId`
- `GET /route-groups/:id`
- `POST /route-groups`
- `PATCH /route-groups/:id`
- `DELETE /route-groups/:id`
- `GET /endpoints/:id`
- `GET /endpoints/route-group/:routeGroupId`
- `POST /endpoints`
- `PATCH /endpoints/:id`
- `DELETE /endpoints/:id`
- `GET /users/me`
- `PATCH /users/me`
- `DELETE /users/me`

## UX Principles

Endpoint Forge should feel like a workbench, not a marketing site once the user is authenticated.

Important UX qualities:

- Fast creation path from blank account to usable endpoint.
- Clear hierarchy: project -> controller/base path -> endpoint.
- Developer-friendly fields and previews.
- Visible mock server state and port.
- Copyable URLs for immediate use.
- Strong validation for route paths and JSON bodies.
- Predictable loading, empty, and error states.
- Bilingual support on the public landing page.
- Tenant routing should feel automatic after login/register.

## Functional Requirements

### Landing and Acquisition

- Display product promise and workflow clearly.
- Support English and Persian copy.
- Allow language switching.
- Allow login and registration from the landing page.
- Open registration when unauthenticated users choose the primary CTA.

### Authentication

- Register with username and password.
- Login with username and password.
- Redirect authenticated users to their tenant dashboard.
- Attach access token to API requests.
- Refresh access token on expired sessions where possible.
- Gracefully redirect users when a session cannot be recovered.
- Logout and clear cached user/project data.

### Project Management

- Create, view, update, and delete projects.
- Show project description when available.
- Show mock server port.
- Show mock server running/stopped state.
- Start and stop the project mock server.
- Refresh project state after mock server actions.

### Controller Management

- Create controllers with base paths beginning with `/`.
- List controllers under each project.
- Navigate to controller details.
- Delete controllers.
- Use controller base path when displaying full endpoint paths.

### Endpoint Management

- Create endpoints under a controller.
- Validate endpoint path begins with `/`.
- Validate status code is numeric.
- Validate response body is valid JSON.
- Support `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
- Support configurable response delay.
- List endpoints in table form.
- Edit endpoints.
- Delete endpoints with confirmation.
- Show endpoint details with formatted JSON response preview.
- Provide copy-to-clipboard for mock URL.

### Profile and Account

- Load current user profile.
- Update username with validation.
- Logout.
- Delete account with confirmation.

## Non-Functional Requirements

- Frontend should remain responsive and reliable under slow API calls.
- API errors should surface as useful notifications and retryable error states.
- Forms should prevent invalid paths, status codes, and JSON before submission.
- Mock endpoint response rendering should preserve formatting and remain readable in light/dark themes.
- Auth redirects should be deterministic across root domain, tenant subdomain, localhost, and `lvh.me`.
- The app should be deployable as a static Vite build served by nginx.

## Technical Architecture

Current stack:

- React 19
- Vite
- TanStack Router with file-based routes
- TanStack Query for server state
- Zustand for auth/client state
- Axios API client with refresh-token interceptor
- React Hook Form and Zod for forms/validation
- Tailwind CSS and local shadcn-style UI components
- CodeMirror for JSON editing
- Framer Motion for landing page animation
- Sonner for toast notifications
- Docker + nginx for production static serving

Important directories:

- `src/routes`: file-based app routes.
- `src/components/pages`: page-level UI components.
- `src/components/ui`: reusable UI primitives.
- `src/backend/api`: API endpoint wrappers.
- `src/backend/services`: DTO-to-model conversion and domain service methods.
- `src/backend/dtos`: backend request/response contracts.
- `src/models`: frontend domain models.
- `src/schemas`: form and model validation schemas.
- `src/hooks`: TanStack Query mutations/queries and UI behavior hooks.
- `src/utils/tenant.ts`: tenant URL and subdomain helpers.
- `src/stores/auth-store.ts`: auth session state.

## Current Implementation Gaps and Planning Notes

These are observations from the current codebase that future prompts and plans should account for.

- README is still the default TanStack Start scaffold and does not describe Endpoint Forge's actual product, setup requirements, environment variables, backend dependency, or tenant/subdomain behavior.
- This repository appears to contain the frontend only. The mock API runtime and persistence behavior depend on an external backend configured through `VITE_API_URL`.
- Endpoint URL copy currently builds `window.location.origin + "/api" + endpoint.path`; it does not include the controller base path in the endpoint detail page. Future work should confirm the intended public mock URL shape.
- Endpoint details are loaded from the endpoint list by controller rather than directly from `GET /endpoints/:id`, even though the service supports direct endpoint fetching.
- Controller cards display endpoint count from `controller.endpoints.length`, but the service currently maps `endpoints` to an empty array because the backend route-group response does not include endpoints.
- Controller update support exists in the service/API layer but does not appear exposed in the current UI.
- Endpoint update invalidates a broad `["endpoints"]` query key, while list queries are keyed as `["endpoints", controllerId]`; future fixes should align cache invalidation.
- Project update invalidates project list but may not refresh the individual `["project", projectId]` query.
- Some notification text is mixed English/Persian and should be standardized based on page language/context.
- Register schema currently validates username and password only; landing copy mentions email in auth text, but the implemented register form appears username/password based.
- There are no obvious committed tests for the product flows yet, despite Vitest being configured.

## Suggested Product Roadmap

### Near-Term

- Replace the scaffold README with product-specific setup and architecture notes.
- Confirm and document the canonical mock endpoint URL format.
- Fix endpoint copy URL to include project/mock server host and controller base path as needed.
- Add controller edit UI.
- Make endpoint detail page fetch directly by endpoint ID or ensure list cache is always available.
- Align TanStack Query invalidation keys after creates, updates, deletes, and mock server actions.
- Add tests for form validation, service DTO mapping, auth refresh behavior, and endpoint creation/update payloads.

### Mid-Term

- Add endpoint duplication for quickly creating alternate states.
- Add import/export for mock API definitions.
- Add collections/examples for common responses.
- Add response variants per endpoint, such as success, validation error, unauthorized, empty state, and server error.
- Add request matching rules for params, query strings, headers, and body.
- Add project-level documentation or generated API reference.
- Add clear mock server base URL display at project level.

### Long-Term

- Add team/workspace collaboration.
- Add role-based access and shared projects.
- Add OpenAPI import/export.
- Add history/versioning for endpoint changes.
- Add usage logs for mock server requests.
- Add automated contract testing or diffing against real backend APIs.
- Add hosted public mock URLs with stable environment separation.

## Success Metrics

Product-level metrics to consider:

- Time from sign-up to first runnable mock endpoint.
- Number of projects created per active user.
- Number of endpoints created per project.
- Percentage of projects that start a mock server.
- Repeat usage across multiple sessions.
- Endpoint edit frequency, indicating iterative frontend testing.
- Copy URL usage or mock server request count, indicating real integration.
- Failed endpoint creation rate, especially invalid JSON/path/status errors.

Quality metrics to consider:

- Auth redirect failure rate.
- Token refresh failure rate.
- API error rate by endpoint.
- Mock server start/stop success rate.
- Time to load project/controller/endpoint screens.
- Form submission success/failure by entity type.

## Open Questions

- What exact URL should users call for a mock endpoint: app origin, mock server port, project-specific subdomain, `/api`, controller base path, endpoint path, or another backend-provided URL?
- Should controller base paths and endpoint paths allow route params such as `/:id`?
- Should endpoint responses be static only, or should they support templating based on request params/body?
- Should mock servers be public, private to authenticated users, or protected by project tokens?
- Are projects isolated strictly by authenticated user, by tenant subdomain, or by future teams/workspaces?
- Should the landing page remain bilingual only, or should the authenticated dashboard also be localized?
- Should account deletion also delete all projects/controllers/endpoints on the backend?
- What is the intended behavior when a project mock server is running and an endpoint is edited?
- What should happen if two endpoints share the same method and full path?

## Definition of Done for Future Features

Future Endpoint Forge changes should generally include:

- Clear placement within the project/controller/endpoint mental model.
- Form validation for all user-entered API contract data.
- Query invalidation or optimistic updates for affected dashboard views.
- Loading, empty, success, and error states.
- Toast notifications with consistent language.
- Tenant-safe navigation and auth behavior.
- At least focused tests for service mapping, validation, and mutation payloads when behavior changes.
- Updated documentation in this PRD or README when product behavior changes.
