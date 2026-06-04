# HostelHR — Hostel Human Resource Management System

Production-ready enterprise SaaS platform for hostel operations: attendance, fees, leave, complaints, payroll, mess, rooms, visitors, emergency response, and AI analytics.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Shadcn-style UI
- **Backend:** Next.js API Routes + Supabase/PostgreSQL (schema included)
- **Auth:** JWT session cookies, role-based access control (6 roles)
- **Deployment:** Vercel-ready

## Roles

| Role | Dashboard |
|------|-----------|
| Super Admin | Full system access |
| Admin | Hostel operations & analytics |
| Warden | Attendance, leave, complaints, emergency |
| Staff | Assigned tasks & complaints |
| Student | Personal portal |
| Parent | Ward monitoring & approvals |

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with demo accounts (password: `demo1234`), or click a role button for one-click login:

**Vercel production:** set `JWT_SECRET` in Environment Variables (required). To use your own email, add `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_ROLE`, and `ADMIN_NAME`, or connect Supabase Auth.

Demo accounts (password: `demo1234`):

- `superadmin@hostelhr.com`
- `admin@hostelhr.com`
- `warden@hostelhr.com`
- `staff@hostelhr.com`
- `student@hostelhr.com`
- `parent@hostelhr.com`

## Supabase Setup

1. Create a Supabase project
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Add credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Project Structure

```
src/
├── app/                    # App Router pages & API routes
│   ├── api/               # REST endpoints (auth, complaints)
│   └── dashboard/         # Role-based module pages
├── components/
│   ├── ui/                # Reusable UI primitives
│   ├── layout/            # Sidebar, header, shell
│   └── dashboard/         # Charts, stats cards
├── lib/
│   ├── auth/              # JWT session management
│   ├── permissions.ts     # RBAC definitions
│   ├── navigation.ts      # Role-based nav
│   └── data/mock.ts       # Demo data layer
└── types/                 # TypeScript definitions
```

## Modules

- Student Attendance (QR, curfew, live occupancy)
- Fee & Rent Management
- Leave Management
- Smart Calendar
- Complaint & Infrastructure Management
- Staff Management & Payroll
- Mess & Meal Tracker
- Room & Hostel Management
- Visitor Management
- Parent Portal
- Emergency & Safety (SOS)
- AI Analytics Dashboard

## Security

- HTTP-only JWT cookies
- Middleware route protection
- RBAC permission checks on API routes
- Security headers (X-Frame-Options, nosniff)
- Zod validation on API inputs
- Row Level Security policies in PostgreSQL schema

## Deploy to Vercel

**Production URL:** [https://hostel-hrms.vercel.app](https://hostel-hrms.vercel.app)

```bash
vercel
```

### Vercel environment variables

Copy from `env.vercel.template` into **Vercel → Project → Settings → Environment Variables** (Production):

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_APP_URL` | `https://hostel-hrms.vercel.app` |
| `CORS_ALLOWED_ORIGINS` | `https://hostel-hrms.vercel.app,http://localhost:3000` |
| `JWT_SECRET` | Generate: `openssl rand -base64 32` |

Optional: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_ROLE`, `ADMIN_NAME`, Supabase keys.

Redeploy after saving env vars.

### CORS

API routes (`/api/*`) allow credentialed requests from origins listed in `CORS_ALLOWED_ORIGINS` and `NEXT_PUBLIC_APP_URL`. Preflight `OPTIONS` requests are handled in middleware.

## License

Private — All rights reserved.
