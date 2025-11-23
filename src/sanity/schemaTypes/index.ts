import type { SchemaTypeDefinition } from 'sanity'

// Document types
import { work } from './documents/work'
import { recording } from './documents/recording'
import { review } from './documents/review'
import { performance } from './documents/performance'
import { aboutPage } from './documents/singletons/aboutPage'
import { siteSettings } from './documents/singletons/siteSettings'

// Supporting types
import { instrument } from './documents/instrument'
import { publisher } from './documents/publisher'
import { blockContent } from './fields/blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    work,
    recording,
    review,
    performance,
    aboutPage,
    siteSettings,

    // Supporting types
    instrument,
    publisher,
    blockContent,
  ],
}
