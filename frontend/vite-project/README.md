# QR Cafe Menu System - Frontend

This folder contains the frontend application for the QR Cafe Menu System, built with React, Vite, Tailwind CSS, and modern web libraries.

## Overview

The frontend provides the user-facing experience for browsing the cafe menu, placing orders, and managing the admin dashboard. It includes separate layouts and pages for customers and administrators.

## Key Features

- Customer menu browsing and ordering
- QR-driven table flow with order creation
- Admin dashboard for menu, categories, users, and order management
- Authentication and protected routing
- Responsive interface with Tailwind CSS

## Project Structure

- `src/`
  - `api/` – API client and endpoint helpers for auth, category, menu, order, and user requests
  - `assets/` – Static images and media resources
  - `components/` – Reusable UI components used across pages and layouts
  - `contexts/` – React context providers for authentication and cart state
  - `hooks/` – Custom hooks for table state and order history logic
  - `layouts/` – Layout wrappers for admin and customer views
  - `pages/` – Top-level page components for admin pages, menu, home, kitchen, login, and order flow

- `public/` – Public static assets served by Vite
- `vite.config.js` – Vite configuration for development and build
- `tailwind.config.js` – Tailwind CSS configuration
- `postcss.config.js` – PostCSS setup for Tailwind processing
- `eslint.config.js` – ESLint configuration for code quality

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Lint the codebase:

```bash
npm run lint
```

## Notes

- The frontend is designed to work with the backend API in `backend/`.
- Authentication and protected routes rely on the backend auth endpoints.
- Tailwind CSS is used for styling and responsive layout.

## Recommended Workflow

1. Start the backend server first.
2. Launch the frontend with `npm run dev`.
3. Open the local Vite URL in your browser.
4. Use the admin routes for dashboard management and the customer routes for ordering.

