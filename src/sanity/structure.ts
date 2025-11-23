import { CogIcon, CommentIcon, DocumentsIcon, InfoOutlineIcon, LaunchIcon, PlayIcon, TiersIcon, UsersIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton pages
      S.listItem()
        .title('About Page')
        .icon(InfoOutlineIcon)
        .schemaType('aboutPage')
        .child(
          S.editor()
            .id('aboutPage')
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),

      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .schemaType('siteSettings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      S.listItem()
        .title('Works')
        .icon(DocumentsIcon)
        .schemaType('work')
        .child(S.documentTypeList('work').title('Works')),

      S.listItem()
        .title('Recordings')
        .icon(PlayIcon)
        .schemaType('recording')
        .child(S.documentTypeList('recording').title('Recordings')),

      S.listItem()
        .title('Reviews')
        .icon(CommentIcon)
        .schemaType('review')
        .child(S.documentTypeList('review').title('Reviews')),

      S.listItem()
        .title('Performances')
        .icon(UsersIcon)
        .schemaType('performance')
        .child(S.documentTypeList('performance').title('Performances')),

      S.divider(),

      S.listItem()
        .title('Instruments')
        .icon(TiersIcon)
        .schemaType('instrument')
        .child(S.documentTypeList('instrument').title('Instruments')),

      S.listItem()
        .title('Publishers')
        .icon(LaunchIcon)
        .schemaType('publisher')
        .child(S.documentTypeList('publisher').title('Publishers')),
    ])
