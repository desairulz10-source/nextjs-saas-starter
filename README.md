# Next.js SaaS Starter

A production-ready, deeply crafted SaaS boilerplate built with modern web technologies. Launch your business in hours, not months.

![Tech Stack](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

## ✨ Features

### 🚀 Business-Ready Foundation
- **Next.js 14** with App Router and Server Actions
- **TypeScript** for type-safe development
- **Tailwind CSS** + **shadcn/ui** for beautiful, accessible UI
- **Dark/Light mode** with next-themes

### 🔐 Authentication & Authorization
- OAuth (Google, GitHub) via NextAuth.js
- Role-based access control (User, Admin)
- Team/Organization support with member roles
- Protected routes and API middleware

### 💳 Billing & Subscriptions
- Stripe integration for payments
- Subscription management (Free, Starter, Pro, Enterprise)
- Customer portal for billing
- Webhook handling for subscription events

### 🏢 Team & Collaboration
- Multi-tenant team support
- Project management within teams
- Activity logging and audit trail
- Member invitation and role management

### 🛠️ Developer Experience
- **Prisma ORM** with PostgreSQL
- **Docker** compose for local development
- **GitHub Actions** CI/CD pipeline
- **Playwright** for E2E testing
- **Vitest** for unit testing
- **ESLint** + **Prettier** code quality

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | NextAuth.js |
| Database | PostgreSQL + Prisma ORM |
| Payments | Stripe |
| Email | Resend |
| Testing | Vitest + Playwright |
| Deployment | Docker + Vercel-ready |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- Stripe account (for billing)
- OAuth app credentials (Google/GitHub)

### 1. Clone & Install

```bash
git clone https://github.com/desairulz10-source/nextjs-saas-starter.git
cd nextjs-saas-starter
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saas_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Resend)
RESEND_API_KEY="re_..."
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Seed with test data
npm run db:seed

# View database in Prisma Studio
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### 🐳 Docker Setup (Alternative)

```bash
# Start everything with Docker Compose
docker-compose up -d

# Database will be available at localhost:5432
# App will be available at localhost:3000
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Dashboard routes (protected)
│   ├── (marketing)/       # Public pages (landing, pricing)
│   ├── api/               # API routes & webhooks
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── shared/           # Shared components
├── lib/                   # Utilities & configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client singleton
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Helper functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
├── types/                 # TypeScript types
├── tests/                 # Test files
├── docker-compose.yml     # Docker services
└── .github/workflows/     # CI/CD pipelines
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Code formatting
npm run format

# Type checking
npm run typecheck
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Docker (Self-Hosted)

```bash
# Build production image
docker build -t saas-app .

# Run production container
docker run -p 3000:3000 saas-app
```

## 📝 Database Schema

### Core Models
- **User** - Authentication & profile
- **Account** - OAuth connections
- **Team** - Organization/workspace
- **TeamMember** - Team membership & roles
- **Project** - Work items within teams
- **Subscription** - Stripe billing data
- **ActivityLog** - Audit trail

### Roles & Permissions

| Role | Permissions |
|------|-------------|
| User | Manage own account, join teams |
| Admin | Full admin access |
| Team Owner | Manage team, billing, members |
| Team Admin | Manage projects & members |
| Team Member | View & contribute to projects |

## 🛡️ Security Features

- CSRF protection via NextAuth.js
- Secure session management
- Role-based route protection
- API rate limiting ready
- Stripe webhook signature verification
- SQL injection prevention via Prisma

## 📚 Documentation

- [Authentication Setup](./docs/AUTH.md)
- [Stripe Integration](./docs/STRIPE.md)
- [Team Management](./docs/TEAMS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [API Reference](./docs/API.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own SaaS business!

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the beautiful component library
- [NextAuth.js](https://next-auth.js.org) for authentication
- [Prisma](https://prisma.io) for database tooling
- [Stripe](https://stripe.com) for payments

---

Built with ❤️ by [desairulz10-source](https://github.com/desairulz10-source)
