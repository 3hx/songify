"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import MultiStepForm from "@/forms/song";
import { useStore } from "@/stores/song";

const CreateStepPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { steps, goToStep } = useStore();

  const currentStepId = pathname.split("/").pop();
  const stepIndex = steps.findIndex((s) => s.id === currentStepId);

  useEffect(() => {
    // Redirect to first step if route is invalid
    if (stepIndex === -1) {
      router.replace(`/create/${steps[0].id}`);
      return;
    }

    // Update store's current step
    goToStep(stepIndex);
  }, [stepIndex, steps, router, goToStep]);

  if (stepIndex === -1) return null;

  return (
    <div className="flex flex-col items-center justify-start py-4 h-full">
      <MultiStepForm />
    </div>
  );
};

export default CreateStepPage;
