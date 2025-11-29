import { FC } from "react";
import { ReviewCard } from "./components/ReviewCard";
import { sortReviews } from "./sort-reviews";
import { ReviewsListing } from "./types";

interface ReviewsListProps {
  reviews: ReviewsListing;
}

export const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => {
  if (!reviews.length) {
    return <p className="text-gray-600">No reviews found.</p>;
  }

  const sortedReviews = sortReviews(reviews);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        <header className="mb-20 flex flex-col items-center md:items-start">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            Reviews
          </h1>
          <div className="mt-4 h-2 w-32 bg-gray-900" />
        </header>

        <div className="divide-y divide-gray-200">
          {sortedReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};
