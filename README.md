# React Boilerplate

A production-ready SPA template built with React 19, TanStack Router, TanStack Query, and Ant Design. Includes authentication, user management, role-based authorization, and client-side permission checks.

## Tech Stack

- **[React 19](https://react.dev/)** — UI library
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development
- **[Vite 6](https://vitejs.dev/)** — Build tool and dev server
- **[TanStack Router v1](https://tanstack.com/router)** — Type-safe routing with loader support
- **[TanStack Query v5](https://tanstack.com/query)** — Server state management and caching
- **[Ant Design v6](https://ant.design/)** — UI component library
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS
- **[React Hook Form](https://react-hook-form.com/)** — Performant form management
- **[Zod v4](https://zod.dev/)** — Schema validation
- **[Axios](https://axios-http.com/)** — HTTP client with request/response interceptors

## Features

- JWT-based authentication (access token + refresh token)
- Role-based access control (RBAC) — client-side permission checks
- Conditional UI rendering via `HasPermission` component and `useHasPermission` hook
- User management (list, create, edit, delete, detail)
- Role management (list, create, edit, delete, detail)
- Role assignment and removal per user (dedicated management page)
- Profile update and password change (avatar, role badges, side-by-side form layout)
- Password reset via email link
- Sidebar menu items shown/hidden based on permissions
- Admin role edit/delete buttons are always hidden
- Users do not see the delete button on their own row
- Delete actions confirmed via Ant Design Modal (Confirm / Cancel buttons)

## Project Structure

```
react-boilerplate/
├── src/
│   ├── main.tsx               # Entry point
│   ├── app.tsx                # Root component and providers
│   ├── core/
│   │   ├── config.ts          # Environment variables
│   │   ├── types.ts           # Shared TypeScript types
│   │   ├── route-parents.tsx  # Root, auth layout, dashboard layout routes
│   │   ├── router.tsx         # Router instance
│   │   ├── components/
│   │   │   └── has-permission.tsx  # Permission-based conditional render component
│   │   ├── hooks/
│   │   │   └── use-has-permission.ts  # Permission check hook
│   │   ├── layouts/
│   │   │   ├── auth-layout.tsx       # Layout for authentication pages
│   │   │   └── dashboard-layout.tsx  # Sidebar + header layout
│   │   ├── lib/
│   │   │   ├── api.ts          # Axios instance with interceptors
│   │   │   ├── permissions.ts  # Permission constants and PERMISSION_MODULES
│   │   │   └── query-client.ts # QueryClient singleton
│   │   └── utils/
│   │       ├── format-date.ts  # Date formatting
│   │       └── get-initials.ts # Name initials
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.constants.ts  # Query keys, API endpoints, validation messages
│   │   │   ├── auth.types.ts      # TAuthUser, TCurrentUser, TSignInResponse
│   │   │   ├── auth.schemas.ts    # Zod schemas
│   │   │   ├── auth.service.ts    # API call functions
│   │   │   ├── auth.hooks.ts      # React Query hooks
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
│   │   ├── users/
│   │   │   ├── users.constants.ts  # Query keys, API endpoints, validation messages
│   │   │   ├── users.types.ts      # TUser, TUserRole
│   │   │   ├── users.schemas.ts    # Zod schemas
│   │   │   ├── users.service.ts    # API call functions
│   │   │   ├── users.hooks.ts      # React Query hooks
│   │   │   ├── users.routes.tsx    # Route definitions (lazy-loaded)
│   │   │   ├── components/
│   │   │   │   ├── create-user-form.tsx
│   │   │   │   ├── edit-user-form.tsx
│   │   │   │   ├── user-detail.tsx
│   │   │   │   ├── user-detail-header.tsx
│   │   │   │   └── users-table.tsx
│   │   │   └── pages/
│   │   │       ├── list-users.page.tsx
│   │   │       ├── create-user.page.tsx
│   │   │       ├── edit-user.page.tsx
│   │   │       ├── user-detail.page.tsx
│   │   │       └── assign-roles.page.tsx
│   │   └── roles/
│   │       ├── roles.constants.ts  # Query keys, API endpoints
│   │       ├── roles.types.ts      # TRole, TRoleListItem
│   │       ├── roles.schemas.ts    # Zod schemas
│   │       ├── roles.service.ts    # API call functions
│   │       ├── roles.hooks.ts      # React Query hooks
│   │       ├── roles.routes.tsx    # Route definitions (lazy-loaded)
│   │       ├── components/
│   │       │   ├── role-form.tsx
│   │       │   ├── roles-table.tsx
│   │       │   └── permission-view.tsx
│   │       └── pages/
│   │           ├── list-roles.page.tsx
│   │           ├── create-role.page.tsx
│   │           ├── edit-role.page.tsx
│   │           └── role-detail.page.tsx
│   └── vite-env.d.ts
├── .env.example
├── tsconfig.json
└── package.json
```

## Getting Started

### Requirements

- Node.js 20+
- A running [fastify-boilerplate](../fastify-boilerplate) instance

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and fill in the values:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

The app starts at `http://localhost:5173`.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and compile for production |
| `npm run preview` | Preview the production build locally |
| `npm run format` | Format source files with Prettier |
| `npm run check-format` | Check formatting without modifying files |
| `npm run lint` | Lint source files with ESLint |
| `npm run lint:fix` | Auto-fix ESLint errors |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application display name | `React Boilerplate` |

## Pages and Routes

| Path | Protection | Description |
|---|---|---|
| `/sign-in` | Public | Sign in with email and password |
| `/forgot-password` | Public | Request a password reset email |
| `/reset-password?token=` | Public | Set a new password using a token |
| `/` | Protected | Redirects to `/users` |
| `/users` | Protected | User list (search, delete) |
| `/users/create` | Protected | Create a new user |
| `/users/:userId` | Protected | User detail view |
| `/users/:userId/edit` | Protected | Edit user information |
| `/users/:userId/roles` | Protected | Assign / remove roles for a user |
| `/roles` | Protected | Role list |
| `/roles/create` | Protected | Create a new role |
| `/roles/:roleId` | Protected | Role detail view |
| `/roles/:roleId/edit` | Protected | Edit role and its permissions |
| `/profile` | Protected | Update profile, change password |

## Authentication Flow

1. **Sign in** — `POST /auth/sign-in` → `accessToken` + `refreshToken` cookie + user info (including roles and permissions)
2. **Authenticated requests** — Axios request interceptor attaches the `accessToken` from the QueryClient cache as `Authorization: Bearer`
3. **Token refresh** — On any 401 response, the Axios response interceptor calls `GET /auth/get-token` using the refresh token cookie to obtain a new `accessToken` and retries the original request; if that also fails, the user is redirected to `/sign-in`. Concurrent 401s share a single refresh call (mutex) to avoid duplicate requests.
4. **Sign out** — `POST /auth/sign-out` clears the refresh token cookie server-side; the app navigates to `/sign-in?isSignedOut=true` and then clears the QueryClient cache. The `isSignedOut` search param prevents the interceptor from attempting a token refresh on any in-flight requests after sign-out.
5. **Authenticated redirect** — If an authenticated user visits a public auth route (`/sign-in`, etc.), `authLayoutRoute.beforeLoad` detects the cached user and redirects to `/`.

## Permission-Based Authorization

After sign-in, the user's roles and permissions are fetched from the API and stored in the React Query cache.

### `HasPermission` Component

Does not render children if the permission is absent:

```tsx
<HasPermission permission={PERMISSIONS.USERS_CREATE}>
  <Button onClick={...}>Create User</Button>
</HasPermission>
```

### `useHasPermission` Hook

For boolean permission checks:

```tsx
const canEdit = useHasPermission(PERMISSIONS.USERS_EDIT)
```

### Enforced Rules

- The **Users** sidebar item is only visible with the `users.list` permission
- The **Roles** sidebar item is only visible with the `roles.list` permission
- Table action buttons (view, edit, delete, manage roles) are shown based on the relevant permissions
- Edit/delete buttons for the **Admin** role are always hidden
- Users do not see the delete button on their own row

## Architecture Notes

- **QueryClient as token store** — The access token is stored in the QueryClient cache instead of `localStorage`; it is automatically cleared on sign-out
- **Token refresh mutex** — If multiple requests return 401 simultaneously, only one `GET /auth/get-token` call is made; all waiting requests await the same promise
- **Retry disabled for HTTP errors** — React Query's retry is disabled for all HTTP errors (status ≥ 400); the Axios interceptors own the retry logic for 401
- **403 / 429 interceptors** — `notification.error` is shown with a deduplicated `key`; 403 also navigates to `/profile`
- **No RouterContext** — `queryClient` is imported as a singleton everywhere; no context is passed through the router
- **Components accept callbacks** — Form components accept `onAction` + `isPending` props; pages own the mutations
- **`invalidateQueries` in pages** — Hooks only call `onSuccess(data)`; pages decide when to invalidate the cache
- **`setQueryData` in pages** — Optimistic cache updates (e.g. profile update) are performed in the page's `onSuccess`
- **Lazy-loaded pages** — All page components are loaded with `React.lazy`; both layouts have `Suspense` boundaries
- **Default exports** — All React components use `export default`; lazy imports do not require a `.then()` transform
- **Arrow function components** — All React components are defined as `const X = () => { ... }`; the `function X() {}` syntax is not used
- **Absolute imports** — All import paths use the `@/` prefix; relative `./` or `../` paths are not used
- **No aliased imports** — `import { x as y }` shorthand aliases are not used; imports use the full name and are destructured if needed
- **No wildcard imports** — `import * as x` namespace imports are not used; explicit named imports are preferred
- **Delete confirmation modal** — User and role deletions are confirmed via Ant Design `Modal` (Confirm / Cancel buttons)

## Adding a New Module

Each module follows this file structure:

```
src/modules/<name>/
├── <name>.constants.ts   # Query keys and API endpoint paths
├── <name>.types.ts       # TypeScript types (T- prefix)
├── <name>.schemas.ts     # Zod validation schemas
├── <name>.service.ts     # Axios API call functions
├── <name>.hooks.ts       # TanStack Query hooks (queryOptions + useMutation)
├── <name>.routes.tsx     # TanStack Router route definitions
├── components/           # Presentational components (accept callback props)
└── pages/                # Page components (own the mutations)
```

Register the module's routes in `src/core/router.tsx`.
