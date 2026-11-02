"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import OnboardingSurvey from "@/components/onboarding/OnboardingSurvey";
import OnboardingComplete from "@/components/onboarding/OnboardingComplete";

export default function OnboardingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (optionId: string) => {
    // TODO: 온보딩 답변 제출 API 연동
    console.log("onboarding answer:", optionId);
    setIsSubmitted(true);
  };

  const handleInstall = () => {
    // TODO: 로그인 후 확장 프로그램 설치 페이지로 이동
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header variant="onboarding" onInstall={handleInstall} />

      <main
        className={`flex flex-1 justify-center px-6 ${
          isSubmitted ? "items-center pb-26" : "items-start pt-2"
        }`}
      >
        {isSubmitted ? (
          <OnboardingComplete onInstall={handleInstall} />
        ) : (
          <OnboardingSurvey onSubmit={handleSubmit} />
        )}
      </main>
    </div>
  );
}
