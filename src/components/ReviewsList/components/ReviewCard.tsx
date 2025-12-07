import Link from "next/link";
import type { FC } from "react";
import { RichText } from "@/components/RichText";
import type { Review } from "../types";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const href = review.slug?.current ? `/reviews/${review.slug.current}` : "#";
  const reviewYear = review.reviewDate
    ? new Date(review.reviewDate).getFullYear()
    : null;

  return (
    <article className="group py-8 first:pt-0">
      <Link href={href} className="block">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
              {review.title}
            </h2>

            {/* Excerpt */}
            {review.excerpt && (
              <div className="mt-3 text-gray-600 line-clamp-2">
                <RichText value={review.excerpt} className="prose-sm" />
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex-shrink-0 md:w-40 text-sm text-gray-500">
            {review.source && (
              <p className="font-medium text-gray-700">{review.source}</p>
            )}
            <p>{[review.author, reviewYear].filter(Boolean).join(", ")}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};
