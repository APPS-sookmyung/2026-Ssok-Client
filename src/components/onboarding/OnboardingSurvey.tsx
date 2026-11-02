"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import {
  ONBOARDING_OPTIONS,
  ONBOARDING_QUESTION,
} from "@/constants/onboarding";

interface OnboardingSurveyProps {
  onSubmit: (optionId: string) => void;
}

export default function OnboardingSurvey({ onSubmit }: OnboardingSurveyProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className="flex w-full max-w-140 flex-col items-center rounded-t-4xl bg-linear-to-b from-[#fff5e1]  to-transparent px-16 pt-12 pb-10">
      <h1 className="text-display-sm font-extrabold text-gray-900">
        {ONBOARDING_QUESTION}
      </h1>

      <ul
        role="radiogroup"
        aria-label={ONBOARDING_QUESTION}
        className="mt-6 flex w-full flex-col gap-3"
      >
        {ONBOARDING_OPTIONS.map(({ id, label }) => {
          const isSelected = selectedId === id;
          return (
            <li key={id}>
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedId(id)}
                className={`h-14 w-full rounded-full border bg-white p-4 text-body-lg font-bold text-gray-900 transition-colors ${
                  isSelected
                    ? "border-primary-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      <Button
        variant="default"
        color="primary"
        size="lg"
        disabled={!selectedId}
        onClick={() => selectedId && onSubmit(selectedId)}
        className="mt-8 w-full"
      >
        제출하기
      </Button>
    </section>
  );
}
