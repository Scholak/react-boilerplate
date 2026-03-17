# React Boilerplate

A production-ready React SPA boilerplate with authentication, user management, and a module-based architecture.

## Tech Stack

- **[React 19](https://react.dev/)** — UI library
- **[TypeScript](https://www.typescriptlang.org/)** — Static typing
- **[Vite 6](https://vitejs.dev/)** — Build tool and dev server
- **[TanStack Router v1](https://tanstack.com/router)** — Type-safe file-based routing with loaders
- **[TanStack Query v5](https://tanstack.com/query)** — Server state management with caching
- **[Ant Design v6](https://ant.design/)** — UI component library
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS
- **[React Hook Form](https://react-hook-form.com/)** — Performant form management
- **[Zod v4](https://zod.dev/)** — Schema validation
- **[Axios](https://axios-http.com/)** — HTTP client with request/response interceptors

## Project Structure

```
react-boilerplate/
├── src/
│   ├── main.tsx               # Entry point
│   ├── app.tsx                # Root component with providers
│   ├── core/
│   │   ├── config.ts          # Environment configuration
│   │   ├── auth.ts            # Token helpers
│   │   ├── types.ts           # Shared TypeScript types
│   │   ├── route-parents.tsx  # Root, auth layout, dashboard layout routes
│   │   ├── router.tsx         # Router instance
│   │   ├── layouts/
│   │   │   ├── auth-layout.tsx       # Centered card layout for auth pages
│   │   │   └── dashboard-layout.tsx  # Sidebar + header layout
│   │   ├── lib/
│   │   │   ├── api.ts         # Axios instance with interceptors
│   │   │   └── query-client.ts # QueryClient singleton + ACCESS_TOKEN_KEY
│   │   └── utils/
│   │       ├── format-date.ts # Date formatting utility
│   │       └── get-initials.ts # Name initials utility
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.constants.ts  # Query keys, API endpoints
│   │   │   ├── auth.types.ts      # TypeScript types
│   │   │   ├── auth.schemas.ts    # Zod schemas
│   │   │   ├── auth.service.ts    # API call functions
│   │   │   ├── auth.hooks.ts      # React Query hooks + authQueryOptions
│   │   │   ├── auth.routes.tsx    # Route definitions (lazy-loaded)
│   │   │   ├── components/
│   │   │   │   ├── sign-in-form.tsx
│   │   │   │   ├── forgot-password-form.tsx
│   │   │   │   ├── reset-password-form.tsx
│   │   │   │   ├── profile-form.tsx
│   │   │   │   └── change-password-form.tsx
│   │   │   └── pages/
│   │   │       ├── sign-in.page.tsx
│   │   │       ├── forgot-password.page.tsx
│   │   │       ├── reset-password.page.tsx
│   │   │       └── profile.page.tsx
│   │   └── users/
│   │       ├── users.constants.ts  # Query keys, API endpoints
│   │       ├── users.types.ts      # TypeScript types
│   │       ├── users.schemas.ts    # Zod schemas
│   │       ├── users.service.ts    # API call functions
│   │       ├── users.hooks.ts      # React Query hooks
│   │       ├── users.routes.tsx    # Route definitions (lazy-loaded)
│   │       ├── components/
│   │       │   ├── create-user-form.tsx
│   │       │   ├── edit-user-form.tsx
│   │       │   ├── user-detail.tsx
│   │       │   └── users-table.tsx
│   │       └── pages/
│   │           ├── list-users.page.tsx
│   │           ├── create-user.page.tsx
│   │           ├── edit-user.page.tsx
│   │           └── user-detail.page.tsx
│   └── vite-env.d.ts
├── .env.example
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- A running instance of [fastify-boilerplate](../fastify-boilerplate) (or any compatible REST API)

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and fill in your values:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

The app starts on `http://localhost:5173`.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run format` | Format source files with Prettier |
| `npm run check-format` | Check formatting without writing |
| `npm run lint` | Lint source files with ESLint |
| `npm run lint:fix` | Lint and auto-fix fixable issues |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application display name | `React Boilerplate` |

## Authentication Flow

1. **Sign in** — `POST /auth/sign-in` returns `accessToken` and sets a `refreshToken` cookie
2. **Authenticated requests** — Axios interceptor attaches `Authorization: Bearer <accessToken>` from QueryClient cache
3. **Refresh** — On `beforeLoad`, if `/auth/me` returns 401, `GET /auth/get-token` is called to obtain a new access token using the refresh token cookie; if that also fails the user is redirected to `/sign-in`
4. **Sign out** — QueryClient cache is cleared; user is redirected to `/sign-in`

## Pages

| Path | Auth | Description |
|---|---|---|
| `/sign-in` | Public | Email & password sign in |
| `/forgot-password` | Public | Request password reset email |
| `/reset-password?token=` | Public | Set new password via reset token |
| `/` | Protected | Redirects to `/users` |
| `/users` | Protected | User list with search and delete |
| `/users/create` | Protected | Create a new user |
| `/users/:userId` | Protected | User detail view |
| `/users/:userId/edit` | Protected | Edit user |
| `/profile` | Protected | Update profile and change password |

## Adding a New Module

Each module follows this structure:

```
src/modules/<name>/
├── <name>.constants.ts   # Query keys and API endpoint paths
├── <name>.types.ts       # TypeScript types (T-prefixed)
├── <name>.schemas.ts     # Zod validation schemas
├── <name>.service.ts     # Axios API call functions
├── <name>.hooks.ts       # TanStack Query hooks (queryOptions + useMutation)
├── <name>.routes.tsx     # TanStack Router route definitions
├── components/           # Presentational components (receive callbacks as props)
└── pages/                # Page components (own mutations, call invalidateQueries)
```

Register the module's routes in `src/core/router.tsx`.

## Architecture Notes

- **QueryClient as token store** — The access token is stored in QueryClient cache under `ACCESS_TOKEN_KEY` instead of `localStorage`, making it memory-only and cleared on sign out
- **No RouterContext** — `queryClient` is imported as a singleton everywhere; no context passing through the router
- **Components receive callbacks** — Form components accept `onAction` + `isPending` props; pages own the mutations and pass handlers down
- **`invalidateQueries` in pages** — Hooks only call `onSuccess(data)`; pages decide what cache to invalidate after a mutation
- **`setQueryData` in pages** — Optimistic/direct cache updates (e.g., after profile update) happen in page `onSuccess`, not in hooks
- **Lazy-loaded pages** — All page components are loaded via `React.lazy` in route files, with `Suspense` boundaries in both layouts
