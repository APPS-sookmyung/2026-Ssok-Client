import Button from "@/components/common/Button";

interface OnboardingCompleteProps {
  onInstall?: () => void;
}

export default function OnboardingComplete({
  onInstall,
}: OnboardingCompleteProps) {
  return (
    <section className="flex flex-col items-center text-center gap-6">
      <h1 className="text-display-md font-bold text-gray-900">
        답변이 제출되었습니다!
        <br />
        SSok을 설치하고 더 많은 서비스를 이용해보세요!
      </h1>
      <p className="text-body-lg font-semibold text-gray-500">
        제출하신 답변은 SSok을 개선하는 데이터로 활용됩니다
      </p>
      <Button
        variant="default"
        color="primary"
        size="lg"
        onClick={onInstall}
        className="w-100"
      >
        설치하러 가기
      </Button>
    </section>
  );
}
