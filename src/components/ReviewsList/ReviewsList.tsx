import type { FC } from "react";
import { ReviewCard } from "./components/ReviewCard";
import { sortReviews } from "./sort-reviews";
import type { ReviewsListing } from "./types";

interface ReviewsListProps {
  reviews: ReviewsListing;
}

export const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => {
  if (!reviews.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-serif text-gray-700 mb-4">
              No reviews found
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Reviews will appear here once they are added to the system.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sortedReviews = sortReviews(reviews);

  // Filter by review type if needed
  const recordingReviews = sortedReviews.filter(
    review => review.reviewType === "recording"
  );
  const performanceReviews = sortedReviews.filter(
    review => review.reviewType === "performance"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20 max-w-6xl">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Reviews & Press
          </h1>
          <div className="h-1.5 w-24 bg-gold mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-8 max-w-2xl mx-auto text-lg">
            Critical reception and reviews of recordings and performances.
          </p>
        </header>

        {/* Optional: Tabs for review types */}
        {(recordingReviews.length > 0 || performanceReviews.length > 0) && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {recordingReviews.length > 0 && (
                <div className="px-6 py-3 bg-blue-50 text-blue-700 rounded-full font-medium">
                  📀 {recordingReviews.length} Recording Review{recordingReviews.length !== 1 ? "s" : ""}
                </div>
              )}
              {performanceReviews.length > 0 && (
                <div className="px-6 py-3 bg-purple-50 text-purple-700 rounded-full font-medium">
                  🎭 {performanceReviews.length} Performance Review{performanceReviews.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="space-y-8">
          {sortedReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-20 pt-12 border-t border-gray-200 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-serif font-bold text-navy">
                {sortedReviews.length}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wider mt-2">
                Total Reviews
              </div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-navy">
                {recordingReviews.length}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wider mt-2">
                Recording Reviews
              </div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-navy">
                {performanceReviews.length}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wider mt-2">
                Performance Reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};