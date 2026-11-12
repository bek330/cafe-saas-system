# Café Menu System - Backend

This folder contains the Express API for the café ordering and management application. It uses PostgreSQL for application data and Cloudinary for uploaded images.

## Features

- JWT-based administrator authentication
- Public menu and category reads
- Public customer order creation
- Administrator-only menu and category management
- Administrator-only order queue, order status updates, and order history
- Administrator-only image uploads to Cloudinary
- Administrator-only dashboard reporting

## Project Structure

- `server.js` — application entrypoint
- `src/app.js` — Express app configuration and route mounting
- `src/config/` — PostgreSQL and Cloudinary configuration
- `src/routes/` — API route definitions
- `src/controllers/` — request handlers
- `src/services/` — business logic and database operations
- `src/middleware/` — authentication, authorization, and error handling

## Requirements

- Node.js
- npm
- PostgreSQL database
- Cloudinary account for image uploads

## Environment Setup

Create a local `.env` file in this folder using `.env.example` as a template.

Required variables:

- `PORT` — API port (defaults to `5000`)
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — long, random signing secret; authentication will not operate without it
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret

Never commit the real `.env` file or production credentials.

## Install and Run

From this directory:

    npm install
    npm run dev

For production:

    npm start

## API Access

| Route prefix | Access | Purpose |
| --- | --- | --- |
| `/auth` | Public login | Obtain a JWT |
| `/categories` | Public reads; admin writes | Manage menu categories |
| `/menu` | Public reads; admin writes | Manage menu items |
| `/orders` | Public order creation; admin queue and updates | Process customer orders |
| `/users` | Admin | Manage staff accounts |
| `/upload` | Admin | Upload menu images |
| `/admin/dashboard` | Admin | View reporting metrics |

Protected endpoints expect an `Authorization: Bearer <token>` header. Tokens expire after 12 hours.

The frontend application is in `../frontend/vite-project`.
