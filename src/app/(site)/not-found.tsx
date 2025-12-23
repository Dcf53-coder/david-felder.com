import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | David Felder",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8 max-w-md text-gray-600">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        aria-label="Return to the homepage"
      >
        Return Home
      </Link>
    </main>
  );
}
