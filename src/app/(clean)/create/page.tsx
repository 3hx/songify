"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/song";
import { STEPS } from "@/stores/song/constants";

export default function CreatePage() {
  const router = useRouter();
  const currentStep = useStore((state) => state.currentStep);

  useEffect(() => {
    const stepId = STEPS[currentStep].id;
    router.replace(`/create/${stepId}`);
  }, [currentStep, router]);

  return null; // Or a loading spinner if you prefer
}
