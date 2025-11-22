import { FC } from "react";

interface PublicationSectionProps {
  publisher: {
    name: string | null;
    website: string | null;
  } | null;
  publisherLink: string | null;
  scoreSampleLink: string | null;
}

export const PublicationSection: FC<PublicationSectionProps> = ({
  publisher,
  publisherLink,
  scoreSampleLink,
}) => {
  return (
    <section>
      <h2 className="text-3xl font-black tracking-tight mb-6">Publication</h2>
      <div className="bg-gray-50 rounded-xl p-6">
        {publisher?.name && (
          <div className="mb-4">
            <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
              Publisher
            </span>
            {publisher.website ? (
              <a
                href={publisher.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-gray-900 hover:text-accent transition-colors"
              >
                {publisher.name}
              </a>
            ) : (
              <p className="text-xl font-semibold text-gray-900">
                {publisher.name}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-4">
          {publisherLink && (
            <a
              href={publisherLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View at Publisher
            </a>
          )}
          {scoreSampleLink && (
            <a
              href={scoreSampleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-accent hover:text-accent transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Score Sample
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
