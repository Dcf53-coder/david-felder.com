import type { SchemaTypeDefinition } from "sanity";
// Supporting types
import { instrument } from "./documents/instrument";
import { performance } from "./documents/performance";
import { publisher } from "./documents/publisher";
import { recording } from "./documents/recording";
import { review } from "./documents/review";
import { aboutPage } from "./documents/singletons/aboutPage";
import { siteSettings } from "./documents/singletons/siteSettings";
// Document types
import { work } from "./documents/work";
import { blockContent } from "./fields/blockContent";

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
};
