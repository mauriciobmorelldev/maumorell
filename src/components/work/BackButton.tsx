"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={className ?? "btn-secondary"}
      onClick={() => router.back()}
      aria-label="Volver"
    >
      ← Volver
    </button>
  );
}
