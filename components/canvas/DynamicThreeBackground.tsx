"use client";

import dynamic from "next/dynamic";
import { CanvasSkeleton } from "@/components/ui/CanvasSkeleton";

const ThreeBackground = dynamic(() => import("@/components/canvas/ThreeBackground"), {
  ssr: false,
  loading: () => <CanvasSkeleton />
});

export function DynamicThreeBackground() {
  return <ThreeBackground />;
}
