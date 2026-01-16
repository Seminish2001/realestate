# AlbaniaEstate

Premium real-estate marketplace for Albania with multilingual UX (sq/en), SEO-first routing, and a full listing lifecycle.

## Tech stack
- Next.js App Router + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma
- Zod validation

## Features
- Marketplace browsing with filters, maps, and featured listings
- Listing detail with gallery, amenities, lead form, and schema.org markup
- Listing creation wizard with validation
- Admin moderation dashboard
- API endpoints for listings, search, favorites, leads, and moderation

## Getting started

### 1) Install dependencies
```bash
npm install
```

### 2) Start Postgres
```bash
docker-compose up -d
```

### 3) Configure environment
```bash
cp .env.example .env
```
Update `DATABASE_URL` if needed.

### 4) Run migrations & seed
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 5) Run the app
```bash
npm run dev
```

Visit `http://localhost:3000/sq` or `http://localhost:3000/en`.

## SEO checklist
- App Router pages are server-rendered
- `sitemap.xml` and `robots.txt` configured
- Canonical URLs on listing detail pages
- Schema.org `RealEstateListing` markup
- Clean URLs: `/sq/listing/slug`

## Deployment
- Deploy on Vercel
- Use a managed Postgres provider (Neon, Supabase, Render)
- Configure S3-compatible storage for images
- Add Stripe keys for subscription billing

## API endpoints
- `GET /api/listings` (filters)
- `POST /api/listings` (create listing)
- `GET /api/search` (search)
- `POST /api/favorites` / `DELETE /api/favorites`
- `POST /api/leads`
- `GET /api/admin/listings` / `PATCH /api/admin/listings`

## Folder structure
```
app/               Next.js routes
components/        Reusable UI components
lib/               Utilities and validation
prisma/            Schema, migrations, seed
```
