# Endpoint Forge

Endpoint Forge is a web workbench for creating realistic mock APIs before a production backend is available or stable.

It helps frontend developers, full-stack developers, QA engineers, and product/demo teams model API surfaces through a UI, organize routes by project and controller, define endpoint responses, and start a mock server that frontend code can call immediately.

> Ship frontend flows before the backend exists.

## Table of Contents

- [Why Endpoint Forge](#why-endpoint-forge)
- [Features](#features)
- [Product Model](#product-model)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Docker](#docker)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Why Endpoint Forge

Frontend work often blocks when backend contracts are incomplete, changing, or unavailable. Teams usually reach for static fixtures, scattered JSON files, hardcoded responses, or ad hoc local mock servers. Those approaches are hard to share, organize, demo, and evolve with the product.

Endpoint Forge provides a UI-managed mock API layer where teams can:

- Create mock API projects for products, features, demos, or test scenarios.
- Group routes in a structure that resembles backend controllers.
- Define HTTP methods, paths, response status codes, delays, and JSON response bodies.
- Start or stop a project-level mock server.
- Copy mock endpoint URLs into frontend code, API clients, or test tools.
- Iterate on API behavior without touching backend code.

For more product detail, see [PRD.md](./PRD.md).

## Features

- Public bilingual landing page with English/Persian content.
- Login and registration flows.
- Username-based tenant dashboard routing.
- Project creation, editing, deletion, and detail views.
- Controller/route-group creation and navigation.
- Endpoint creation, editing, deletion, JSON response editing, and response preview.
- Project-level mock server start/stop controls.
- Mock URL copy flow for endpoint testing.
- Profile update, logout, and account deletion.
- Token refresh flow for authenticated API requests.

## Product Model

Endpoint Forge uses a simple hierarchy:

```text
Project
└── Controller / Route Group
    └── Endpoint
```

- **Project**: The top-level mock API workspace. A project can be started or stopped as a mock server and may have an assigned port.
- **Controller / Route Group**: A grouped base path inside a project, such as `/users`, `/products`, or `/orders`.
- **Endpoint**: A mock route definition with an HTTP method, relative path, status code, artificial delay, and JSON response body.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [CodeMirror](https://codemirror.net/)
- [Vitest](https://vitest.dev/)

## Getting Started

### Prerequisites

- Node.js 22 or newer is recommended.
- pnpm.
- A running Endpoint Forge API service.

### Installation

```bash
pnpm install
```

### Configure Environment

Copy the example environment file and update values for your local setup:

```bash
cp .env.example .env
```

At minimum, set `VITE_API_URL` to the backend API base URL.

### Run the App

```bash
pnpm dev
```

The app runs on:

```text
http://lvh.me:3000
```

Endpoint Forge uses tenant-based routing, so contributors should open the dev server through `lvh.me` instead of `localhost`. The `lvh.me` domain resolves back to your local machine while still allowing tenant subdomains to work correctly.

After login or registration, the app can redirect to a tenant URL like:

```text
http://{username}.lvh.me:3000/projects
```

## Environment Variables

| Variable            | Purpose                                    | Example                 |
| ------------------- | ------------------------------------------ | ----------------------- |
| `VITE_API_URL`      | Backend API base URL used by the frontend. | `http://api.lvh.me:4000` |
| `VITE_DEV_DOMAIN`   | Local development domain.                  | `lvh.me`                |
| `VITE_APP_DOMAIN`   | Root app domain used for tenant URLs.      | `lvh.me`                |
| `VITE_APP_PORT`     | Frontend app port.                         | `3000`                  |
| `VITE_APP_PROTOCOL` | Protocol used when building app URLs.      | `http`                  |

## Available Scripts

```bash
pnpm dev
```

Starts the Vite development server on port `3000`. Open it at `http://lvh.me:3000` so tenant routing works in development.

```bash
pnpm build
```

Builds the production app.

```bash
pnpm preview
```

Serves the production build locally.

```bash
pnpm test
```

Runs the Vitest test suite.

```bash
pnpm lint
```

Runs ESLint.

```bash
pnpm format
```

Checks Prettier formatting.

```bash
pnpm check
```

Runs Prettier write mode and ESLint fix mode.

## Docker

Build and run the production container locally:

```bash
docker compose up --build
```

The app will be available at:

```text
http://lvh.me:3000
```

Build the image directly:

```bash
docker build -t endpoint-forge .
```

## Project Structure

```text
.
├── PRD.md
├── src
│   ├── components
│   ├── contexts
│   ├── hooks
│   ├── lib
│   ├── models
│   ├── providers
│   ├── routes
│   ├── schemas
│   ├── services
│   ├── stores
│   └── utils
├── public
├── Dockerfile
├── docker-compose.yml
└── package.json
```

Important areas:

- `src/routes`: File-based application routes.
- `src/hooks`: Data and UI hooks for auth, projects, controllers, endpoints, mock server state, and profile actions.
- `src/schemas`: Zod schemas for form and request validation.
- `src/services`: API and notification services.
- `src/stores`: Client-side state, including auth state.
- `src/utils`: Tenant and auth helper utilities.

## Contributing

Endpoint Forge is an open source project. Contributions are welcome in the form of bug reports, feature ideas, documentation improvements, tests, UI polish, and code changes.

### Before You Start

- Read [PRD.md](./PRD.md) to understand the product direction and current workflows.
- Search existing issues and pull requests before opening a new one.
- For larger changes, open an issue first so the approach can be discussed.
- Keep changes focused. Small pull requests are easier to review and merge.
- Endpoint Forge also has a backend repository. Clone [Bytepute/endpointForge-backend](https://github.com/Bytepute/endpointForge-backend) if you need to run the API service locally.

### Development Workflow

1. Fork the repository.
2. Create a branch from the default branch.
3. Install dependencies with `pnpm install`.
4. Copy `.env.example` to `.env` and configure your API URL.
5. Run the app with `pnpm dev`.
6. Make your changes.
7. Run the relevant checks before opening a pull request.

Recommended checks:

```bash
pnpm test
pnpm lint
pnpm format
pnpm build
```

### Pull Request Guidelines

Please include:

- A clear description of what changed and why.
- Screenshots or screen recordings for UI changes.
- Notes about any environment, API, routing, or tenant-domain behavior affected by the change.
- Tests for new behavior when practical.
- Any follow-up work that should happen after the pull request.

### Code Style

- Use TypeScript for application code.
- Follow the existing React, TanStack Router, and TanStack Query patterns.
- Keep UI behavior accessible and responsive.
- Use Zod schemas for form/request validation where they fit the existing pattern.
- Prefer small, focused components and hooks over broad rewrites.
- Keep generated files, build output, and local environment files out of pull requests.

### Reporting Bugs

When reporting a bug, include:

- What you expected to happen.
- What actually happened.
- Steps to reproduce the issue.
- Browser and operating system details when relevant.
- Console errors, network errors, or screenshots if available.

### Suggesting Features

When suggesting a feature, include:

- The user problem it solves.
- The workflow it affects.
- Any API or UI behavior you expect.
- Alternatives you considered, if any.

### Security

Please do not publicly disclose security vulnerabilities in an issue. If you find a security problem, contact the maintainers privately first.

## License

This project is licensed under the terms in [LICENSE](./LICENSE).
