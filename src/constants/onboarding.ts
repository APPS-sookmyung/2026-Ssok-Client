export interface OnboardingOption {
  id: string;
  label: string;
}

export const ONBOARDING_QUESTION = "어떤 상황에서 SSok을 사용하실 계획인가요?";

export const ONBOARDING_OPTIONS: OnboardingOption[] = [
  { id: "reference", label: "새로운 프로젝트/기획을 위한 레퍼런스 수집할 때" },
  { id: "archive", label: "기술 아티클, 논문, 개발 공식 문서 등을 아카이빙할 때" },
  { id: "team-share", label: "팀원들과 유용한 링크나 리서치 자료를 실시간으로 공유할 때" },
  { id: "personal", label: "업무 외에 개인적인 취향이나 취미 자료를 저장할 때" },
  { id: "etc", label: "기타" },
];
