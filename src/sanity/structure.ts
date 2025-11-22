import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Main content sections
      S.listItem()
        .title('Works')
        .schemaType('work')
        .child(S.documentTypeList('work').title('Works')),

      S.listItem()
        .title('Recordings')
        .schemaType('recording')
        .child(S.documentTypeList('recording').title('Recordings')),

      S.listItem()
        .title('Reviews')
        .schemaType('review')
        .child(S.documentTypeList('review').title('Reviews')),

      S.listItem()
        .title('Performances')
        .schemaType('performance')
        .child(S.documentTypeList('performance').title('Performances')),

      S.divider(),

      // Singleton pages
      S.listItem()
        .title('About Page')
        .schemaType('aboutPage')
        .child(
          S.editor()
            .id('aboutPage')
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),

      S.listItem()
        .title('Contact Page')
        .schemaType('contactPage')
        .child(
          S.editor()
            .id('contactPage')
            .schemaType('contactPage')
            .documentId('contactPage')
        ),

      S.divider(),

      // Reference data
      S.listItem()
        .title('Reference Data')
        .child(
          S.list()
            .title('Reference Data')
            .items([
              S.listItem()
                .title('Instruments')
                .schemaType('instrument')
                .child(S.documentTypeList('instrument').title('Instruments')),

              S.listItem()
                .title('Publishers')
                .schemaType('publisher')
                .child(S.documentTypeList('publisher').title('Publishers')),
            ])
        ),
    ])
