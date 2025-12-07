# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js + Sanity CMS** website for composer David Felder (david-felder.com). The site is a portfolio/catalog for a classical music composer, featuring works, recordings, reviews, performances, and programming information.

Built with Next.js 16 and Sanity v4, this application was migrated from a legacy Craft CMS 3 installation.

## Development Commands

**This project uses pnpm as the package manager.**

### Core Commands
```bash
# Development server (runs on http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Linting (uses Biome)
pnpm lint

# Auto-format code
pnpm format

# Generate Sanity types
pnpm typegen
```

### Sanity Admin
- Access Sanity Studio at: http://localhost:3000/admin
- Configured in `sanity.config.ts` with basePath '/admin'

## Architecture

### Content Schema (Sanity)

The site uses Sanity CMS with the following document types:

**Main Documents:**
- `work` - Musical compositions (instrumentation, duration, program notes, media, downloads)
- `recording` - CD/album releases (tracks, performers, album art, streaming links)
- `review` - Press reviews and news articles
- `performance` - Concert performances
- `aboutPage` - Singleton about page
- `siteSettings` - Singleton site configuration

**Supporting Documents:**
- `instrument` - Instruments for work instrumentation
- `publisher` - Publisher information

All schemas are defined in `src/sanity/schemaTypes/`.

### Key Schema Features

**Work Document:**
- Organized into groups: basic, media, electronics, commission, publication, downloads
- Supports parent/child relationships for series (e.g., multi-movement works)
- Rich instrumentation system with references to instrument documents
- Multiple media types: audio embeds, video embeds, images, electronic music files
- Password-protected downloads for scores/parts
- Commission and publication metadata

**Recording Document:**
- Album metadata with cover art
- Track listings with work references
- Performer credits
- Streaming platform links (Spotify, Apple Music, etc.)

**Review Document:**
- Publication and author info
- Rich text content (Portable Text)
- Associated work references

### Next.js App Structure

```
src/
├── app/
│   ├── (site)/              # Main site routes
│   │   ├── page.tsx         # Homepage
│   │   ├── layout.tsx       # Site layout with header/footer
│   │   ├── works/           # Works catalog
│   │   │   ├── page.tsx     # Works list
│   │   │   └── [slug]/page.tsx  # Individual work detail
│   │   ├── recordings/      # Recordings catalog
│   │   │   ├── page.tsx     # Recordings list
│   │   │   └── [slug]/page.tsx  # Individual recording detail
│   │   ├── reviews/         # Reviews archive
│   │   │   ├── page.tsx     # Reviews list
│   │   │   └── [slug]/page.tsx  # Individual review
│   │   └── programming/     # Programming page
│   ├── admin/[[...tool]]/   # Sanity Studio (mounted at /admin)
│   ├── api/                 # API routes
│   │   └── verify-password/ # Password verification for downloads
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── GlobalHeader/
│   ├── GlobalFooter/
│   ├── WorkDetail/          # Work detail page sections
│   │   └── sections/        # Modular sections (Audio, Downloads, etc.)
│   ├── WorksList/
│   ├── RecordingDetail/
│   ├── RecordingsList/
│   ├── ReviewDetail/
│   ├── ReviewsList/
│   └── ProgrammingTable/
├── sanity/
│   ├── env.ts               # Sanity environment config
│   ├── lib/
│   │   ├── client.ts        # Sanity client (read-only)
│   │   ├── live.ts          # Live preview client
│   │   ├── token.ts         # Auth token management
│   │   └── image.ts         # Image URL builder
│   ├── schemaTypes/
│   │   ├── documents/       # Document schemas
│   │   ├── fields/          # Reusable field definitions
│   │   ├── objects/         # Object type schemas
│   │   └── index.ts         # Schema registry
│   └── structure.ts         # Studio structure/navigation
└── utils/                   # Utility functions
    ├── format-instrumentation.ts  # Format instrument lists
    ├── format-date.ts             # Date formatting
    ├── pluralize.ts               # Pluralization helper
    ├── join.ts                    # Array joining utility
    └── embed-providers.ts         # Media embed URL parsing
```

### Data Flow

1. **Content managed in Sanity Studio** (`/admin`)
2. **Next.js pages fetch data** using GROQ queries via `next-sanity` client
3. **Components render content** with type-safe Sanity data
4. **Static generation** used for most pages (ISR possible)

### Sanity Integration

- Uses `next-sanity` package for Next.js integration
- Sanity Vision plugin enabled for GROQ query testing in Studio
- Image optimization via Sanity CDN (`@sanity/image-url`)
- Live preview support configured in `src/sanity/lib/live.ts`

### Component Organization

Components follow a modular pattern:
- **Detail components** (WorkDetail, RecordingDetail, ReviewDetail) use section-based architecture
- **List components** (WorksList, RecordingsList, ReviewsList) handle filtering and display
- **Section components** in `components/[Feature]/sections/` are self-contained modules

Example: `WorkDetail` renders different sections based on available data (audio, video, downloads, etc.)

### Utilities

Key utilities provide domain-specific formatting:
- `format-instrumentation.ts` - Converts instrument arrays to human-readable strings (e.g., "flute, 2 clarinets, and piano")
- `format-date.ts` - Handles date formatting for performances/publications
- `embed-providers.ts` - Parses embed URLs for YouTube, Vimeo, SoundCloud, etc.

All utilities have corresponding `.test.ts` files using Vitest.

### Styling

- **Tailwind CSS v4** for styling (configured in `postcss.config.mjs`)
- **@tailwindcss/typography** plugin for rich text rendering
- **styled-components** used selectively for complex components
- Custom fonts managed via `next/font`

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- React JSX transform enabled
- React Compiler enabled in Next.js config for performance

### Testing

- **Vitest** configured for unit tests
- Test files co-located with source (e.g., `format-date.test.ts`)
- Run tests with `pnpm test`

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-21
SANITY_TOKEN=  # For write operations in scripts
```

### Code Quality

- **Biome** for linting and formatting (replaces ESLint + Prettier)
- Configuration in `biome.json`
- Next.js and React linting domains enabled
- Git integration enabled for VCS awareness

### Password-Protected Downloads

Work documents can have password-protected downloads (scores/parts). The flow:
1. Download links rendered in `WorkDetail/sections/DownloadsSection.tsx`
2. Password prompt on click
3. API route `/api/verify-password` validates against work document
4. Download initiated if password matches

### Image Handling

- Images stored in Sanity CDN
- Use `@sanity/image-url` builder for responsive images
- Next.js Image component configured for `cdn.sanity.io` domain
- Remote patterns configured in `next.config.ts`

### Deployment

- Configured for Vercel deployment
- React Compiler enabled for production optimizations
- Build output in `.next/` (gitignored)
