import type { FC } from "react";
import { RecordingCard } from "./components/RecordingCard";
import { sortRecordings } from "./sort-recordings";
import type { RecordingsListing } from "./types";

interface RecordingsListProps {
  recordings: RecordingsListing;
}

export const RecordingsList: FC<RecordingsListProps> = ({ recordings }) => {
  if (!recordings.length) {
    return <p className="text-gray-600">No recordings found.</p>;
  }

  const sortedRecordings = sortRecordings(recordings);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-6xl">
        <header className="mb-20 flex flex-col items-center md:items-start">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            Recordingssss
          </h1>
          <div className="mt-4 h-2 w-32 bg-gray-900" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {sortedRecordings.map((recording) => (
            <RecordingCard key={recording._id} recording={recording} />
          ))}
        </div>
      </div>
    </div>
  );
};
