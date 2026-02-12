# Conventions

To keep this project consistent and easy to maintain, we establish clear code and UI conventions that will be followed throughout development. This includes agreed‑upon naming patterns, styling rules, and component structures.

By documenting these conventions, we also create a clear list of components we plan to build. This ensures that every developer — whether joining now or contributing in the future — can quickly understand the project’s structure and contribute without guessing or reinventing patterns.

In short, this file acts as a shared reference point: it protects consistency, reduces confusion, and makes collaboration smoother.

## File Structure and Naming Rules

### Folder and Files

src/
├── components/         — reusable UI parts
│    ├── ui/               — small, generic UI elements (buttons, inputs, modals)
│    ├── features/         — feature-specific components (listing cards, search bar, filters)
│
├── layouts/            — global layout components (header, footer, main layout)
│
├── pages/              — page components routed by React Router
│    ├── auth/             — login, signup, password reset pages
│    ├── dashboard/        — agent/admin dashboards
│    ├── listings/         — listing-related pages (create, edit, detail, search)
│
├── styles/             — global CSS or utility styles
│
├── types/              — TypeScript types/interfaces
├── utils/              — helper functions (formatting, validation, API helpers)
├── hooks/              — custom hooks (auth hooks, form hooks, data fetching)
├── services/           — API calls, auth service, external integrations
├── context/            — React context providers (auth context, theme context)
├── assets/             — static files (images, icons, fonts)

### Component File Naming

- PascalCase.tsx

### CSS Classes Naming

- Always use Tailwind classes.
- If a component has complex styles, use clsx or utility functions.
- Avoid inline styles unless dynamic.

## Tailwind Config Conventions

### Breakpoints

- sm: '640px',
- md: '768px',
- lg: '1024px',
- xl: '1280px'

### Font Family

### Color tokens

### Spacing scale
