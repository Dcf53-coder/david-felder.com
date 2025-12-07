# David Felder - Composer Portfolio Website

A modern Next.js-based portfolio and catalog website for composer David Felder, featuring his musical works, recordings, reviews, and performances. Built with Next.js 16 and Sanity CMS v4.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Working with Sanity CMS](#working-with-sanity-cms)
- [Key Features](#key-features)
- [Development Workflows](#development-workflows)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables (see below)
cp .env.example .env.local

# Run development server
pnpm dev
```

Visit:
- Website: http://localhost:3000
- Sanity Studio (CMS): http://localhost:3000/admin

## Project Overview

This is a portfolio/catalog website for classical music composer David Felder. The site showcases:

- **Works** - Musical compositions with instrumentation, program notes, media, and downloads
- **Recordings** - CD/album releases with track listings and streaming links
- **Reviews** - Press reviews and news articles
- **Performances** - Concert performance history
- **Programming** - Information for programmers and performers

The site was migrated from a legacy Craft CMS 3 installation to a modern Next.js + Sanity stack.

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **styled-components** - CSS-in-JS for complex components

### CMS
- **Sanity v4** - Headless CMS for content management
- **GROQ** - Query language for Sanity data
- **Portable Text** - Rich text format

### Developer Tools
- **Biome** - Fast linter and formatter (replaces ESLint + Prettier)
- **Vitest** - Unit testing framework
- **pnpm** - Fast, disk-efficient package manager

## Development Setup

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **pnpm** 9+ (install with: `npm install -g pnpm`)
- Access to the Sanity project (credentials from David)

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-21

SANITY_TOKEN=your_write_token
```

**Where to get these values:**
- Project ID: From Sanity dashboard at sanity.io/manage
- Dataset: "production"
- Token: Generate in Sanity dashboard under API settings (only needed for data migration scripts)

### Installation

```bash
# Install dependencies
pnpm install

# Generate TypeScript types from Sanity schemas
pnpm typegen

# Start development server
pnpm dev
```

## Project Structure

```
david-felder.com/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (site)/              # Main website routes
│   │   │   ├── layout.tsx       # Site layout with header/footer
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── works/           # Works catalog pages
│   │   │   ├── recordings/      # Recordings catalog pages
│   │   │   ├── reviews/         # Reviews archive pages
│   │   │   └── programming/     # Programming info page
│   │   ├── admin/               # Sanity Studio (CMS interface)
│   │   ├── api/                 # API routes
│   │   │   └── verify-password/ # Password verification for downloads
│   │   └── layout.tsx           # Root layout
│   │
│   ├── components/              # React components
│   │   ├── GlobalHeader/        # Site header
│   │   ├── GlobalFooter/        # Site footer
│   │   ├── WorkDetail/          # Work detail page
│   │   │   └── sections/        # Modular sections (Audio, Video, Downloads, etc.)
│   │   ├── WorksList/           # Works listing
│   │   ├── RecordingDetail/     # Recording detail page
│   │   ├── RecordingsList/      # Recordings listing
│   │   ├── ReviewDetail/        # Review detail page
│   │   ├── ReviewsList/         # Reviews listing
│   │   └── ProgrammingTable/    # Programming info table
│   │
│   ├── sanity/                  # Sanity CMS integration
│   │   ├── env.ts              # Environment config
│   │   ├── lib/                # Sanity utilities
│   │   │   ├── client.ts       # Sanity client (read-only)
│   │   │   ├── live.ts         # Live preview client
│   │   │   ├── token.ts        # Auth token management
│   │   │   └── image.ts        # Image URL builder
│   │   ├── schemaTypes/        # Content schemas
│   │   │   ├── documents/      # Document type schemas
│   │   │   ├── fields/         # Reusable field definitions
│   │   │   ├── objects/        # Object type schemas
│   │   │   └── index.ts        # Schema registry
│   │   └── structure.ts        # Studio UI structure
│   │
│   └── utils/                   # Utility functions
│       ├── format-instrumentation.ts  # Format instrument lists
│       ├── format-date.ts             # Date formatting
│       ├── pluralize.ts               # Pluralization helper
│       ├── join.ts                    # Array joining
│       └── embed-providers.ts         # Media embed URL parsing
│
├── scripts/                     # Data migration/maintenance scripts
│   ├── export-to-sanity.mjs    # Legacy: Craft CMS to Sanity migration
│   └── update-review-work-references.mjs
│
├── sanity.config.ts            # Sanity Studio configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── biome.json                  # Biome linter/formatter config
└── vitest.config.ts            # Vitest testing config
```

## Working with Sanity CMS

### Accessing the CMS

1. Start the dev server: `pnpm dev`
2. Navigate to: http://localhost:3000/admin
3. Log in with your Sanity credentials

### Content Types

The CMS has these document types:

#### Main Documents

**Work** - Musical composition
- Basic info: title, year, duration, instrumentation
- Media: audio embeds, video embeds, images, electronic music files
- Downloads: password-protected scores and parts
- Commission and publication metadata

**Recording** - Album/CD release
- Album metadata with cover art
- Track listings with work references
- Performer credits
- Streaming platform links

**Review** - Press review or news article
- Publication and author information
- Rich text content (Portable Text)
- Associated work references

**Performance** - Concert performance
- Date, venue, performers
- Associated work references

**About Page** - Singleton document
- Biographical content
- Photos

**Site Settings** - Singleton document
- Global site configuration

#### Supporting Documents

**Instrument** - Musical instrument
- Used for work instrumentation

**Publisher** - Music publisher
- Used for publication metadata

### Content Schema Location

All schemas are defined in `src/sanity/schemaTypes/`:
- `documents/` - Full document types
- `fields/` - Reusable field configurations

### Making Schema Changes

1. Edit schema files in `src/sanity/schemaTypes/`
2. Run `pnpm typegen` to regenerate TypeScript types
3. Restart dev server if needed
4. Changes appear immediately in Sanity Studio

### GROQ Queries

Sanity uses GROQ (Graph-Relational Object Queries) to fetch data. Examples:

```typescript
// Fetch all works with basic info
const works = await client.fetch(`
  *[_type == "work"] | order(year desc) {
    _id,
    title,
    year,
    instrumentation[]-> {
      name,
      pluralName,
      abbreviation
    }
  }
`)

// Fetch a single work by slug with all media
const work = await client.fetch(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    year,
    audioEmbeds,
    videoEmbeds,
    images
  }
`, { slug: 'work-slug' })
```

**Testing GROQ queries:**
- Use the Vision plugin in Sanity Studio
- Access it from the studio navigation menu
- Write and test queries before implementing them in code

### Sanity Live Preview

The project is configured for live preview updates. Changes in Sanity Studio can appear instantly in the frontend during development, although it will take additional work to set it up. 

## Key Features

### Password-Protected Downloads

Works can have password-protected downloads (scores/parts):

1. Download link rendered in `WorkDetail/sections/DownloadsSection.tsx`
2. User clicks download, enters password
3. API route `/api/verify-password` validates password against work document
4. Download initiates if password matches

Implementation:
- Password stored in work document (`downloadPassword` field)
- File URLs are Sanity asset references
- Client-side password prompt before download

### Media Embeds

Supports multiple embed providers:
- YouTube
- Vimeo
- SoundCloud
- Spotify

Parsing handled by `src/utils/embed-providers.ts`

### Instrumentation Formatting

Complex instrumentation arrays are formatted into readable strings:

```typescript
// Input: [{ name: "flute", quantity: 1 }, { name: "clarinet", quantity: 2 }]
// Output: "flute, 2 clarinets"
```

Logic in `src/utils/format-instrumentation.ts`

### Work Relationships

Works can have parent/child relationships for multi-movement pieces or series:
- Parent work has multiple child works
- Child works reference parent via `parentWork` field
- Displayed hierarchically in work lists

## Development Workflows

### Common Development Commands

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Start production server locally
pnpm start

# Regenerate Sanity TypeScript types
pnpm typegen
```

### Adding a New Page

1. Create route folder in `src/app/(site)/your-page/`
2. Add `page.tsx` for the page component
3. Add `layout.tsx` if custom layout needed
4. Fetch data using `sanityFetch` from `@/sanity/lib/live`
5. Create components in `src/components/YourPage/`

Example:
```typescript
// src/app/(site)/your-page/page.tsx
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'

const YOUR_PAGE_QUERY = defineQuery(`*[_type == "yourType"] {
  _id,
  title,
  slug,
  // ... other fields
}`)

export default async function YourPage() {
  const { data } = await sanityFetch({
    query: YOUR_PAGE_QUERY,
  })
  
  if (!data) {
    return <div>No data found</div>
  }
  
  return (
    <div>
      <h1>Your Page</h1>
      {/* Render data */}
    </div>
  )
}
```

### Adding a New Component

1. Create folder in `src/components/ComponentName/`
2. Add `index.tsx` for the component
3. Add types if needed
4. Write tests in `ComponentName.test.tsx` (optional but recommended)
5. Import and use in pages

### Modifying Sanity Schema

1. Edit schema in `src/sanity/schemaTypes/`
2. Run `pnpm typegen` to update types
3. Restart dev server
4. Update queries and components to use new fields

### Working with Images

Use Sanity's image URL builder:

```typescript
import { urlFor } from '@/sanity/lib/image'

// In component
<img 
  src={urlFor(image).width(800).height(600).url()} 
  alt="Description"
/>

// With Next.js Image
import Image from 'next/image'

<Image
  src={urlFor(image).width(800).url()}
  alt="Description"
  width={800}
  height={600}
/>
```

### TypeScript Path Aliases

The project uses `@/` as an alias for `./src/`:

```typescript
// Instead of
import { client } from '../../../sanity/lib/client'

// Use
import { client } from '@/sanity/lib/client'
```

## Testing

### Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test format-date.test.ts
```

### Writing Tests

Tests use Vitest and are co-located with source files:

```typescript
// src/utils/format-date.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from './format-date'

describe('formatDate', () => {
  it('formats dates correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024')
  })
})
```

### Test Coverage

Current test coverage focuses on utility functions:
- `format-date.ts`
- `format-instrumentation.ts`
- `pluralize.ts`
- `join.ts`
- `embed-providers.ts`

Consider adding tests when:
- Writing new utility functions
- Implementing complex business logic
- Fixing bugs (write test first, then fix)

## Deployment

### Vercel

This project is configured for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Environment variables to set in Vercel:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

### Build Process

```bash
# Test production build locally
pnpm build
pnpm start
```

Build output goes to `.next/` (gitignored)

### Optimizations

The project includes:
- React Compiler for automatic optimizations
- Static generation for most pages
- Image optimization via Sanity CDN
- Tailwind CSS purging unused styles

## Troubleshooting

### Common Issues

**"Cannot find module" errors**
- Run `pnpm install` to ensure all dependencies are installed
- Check that path aliases are correct (`@/` maps to `./src/*`)

**Sanity Studio not loading**
- Verify environment variables are set in `.env.local`
- Check that you're accessing http://localhost:3000/admin (not just /admin)
- Clear `.next` folder and restart dev server

**TypeScript errors after schema changes**
- Run `pnpm typegen` to regenerate types
- Restart TypeScript server in your editor

**Images not loading**
- Verify Sanity CDN domain is configured in `next.config.ts`
- Check that image references are valid in Sanity
- Use `urlFor()` helper from `@/sanity/lib/image`

**Build failing**
- Run `pnpm lint` to check for linting errors
- Run `pnpm test` to check for test failures
- Check that all required environment variables are set

### Getting Help

- Check the Next.js documentation: https://nextjs.org/docs
- Check the Sanity documentation: https://www.sanity.io/docs
- Review existing code patterns in the project
- Search for similar implementations in the codebase

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Biome Documentation](https://biomejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

## Project History

This site was migrated from a legacy Craft CMS 3 installation. The migration script (`scripts/export-to-sanity.mjs`) performed a one-time data migration from MySQL to Sanity. The legacy code should not be referenced for new development.

Key migration transformations:
- Craft Matrix fields → Sanity block content
- Craft Assets → Sanity assets with CDN hosting
- Craft entries → Sanity documents
- HTML content → Portable Text blocks
