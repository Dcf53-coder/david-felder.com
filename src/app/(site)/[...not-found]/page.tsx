import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound(); // This manually triggers your custom app/not-found.tsx
}
