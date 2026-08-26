"use client";

import Link from "next/link";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import IconCircle from "@/components/common/IconCircle";

import AlarmIcon from "@/assets/icons/common/alarm.svg";
import MyIcon from "@/assets/icons/common/my.svg";

export type HeaderVariant = "default" | "onboarding";

interface HeaderProps {
  variant?: HeaderVariant;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  onInvite?: () => void;
  onInstall?: () => void;
  onAlarmClick?: () => void;
  onProfileClick?: () => void;
}

export default function Header({
  variant = "default",
  onInvite,
  onInstall,
  onAlarmClick,
  onProfileClick,
}: HeaderProps) {
  return (
    <header
      className={`top-0 flex h-31.25 w-full items-center justify-between ${variant === "default" ? "border-b border-primary-400" : ""} p-8`}
    >
      {/* 1. 좌측 로고 */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/ssok/logo.svg"
            alt="Logo"
            className="h-15.25 w-auto object-contain"
          />
        </Link>
      </div>

      {/* 2. 중앙 영역 (Default: 검색창 / Onboarding: 빈 영역) */}
      {variant === "default" ? (
        <div className="flex flex-1 justify-center px-6 max-w-2xl">
          <SearchInput placeholder="무엇을 찾고 싶으신가요?" />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* 3. 우측 액션 영역 */}
      <div className="flex items-center gap-7">
        {variant === "onboarding" ? (
          <Button
            variant="default"
            color="primary"
            size="md"
            onClick={onInstall}
          >
            설치하러 가기
          </Button>
        ) : (
          <>
            <Button
              variant="default"
              color="secondary"
              size="sm"
              onClick={onInvite}
              leftIcon
            >
              팀원 초대
            </Button>

            <IconCircle
              icon={
                <img
                  src={AlarmIcon.src}
                  alt="Alarm"
                  className="w-full h-full object-contain"
                />
              }
              altText="Alarm"
              onClick={onAlarmClick}
            />
            <IconCircle
              icon={
                <img
                  src={MyIcon.src}
                  alt="내 프로필"
                  className="w-full h-full object-contain"
                />
              }
              altText="내 프로필"
              onClick={onProfileClick}
            />
          </>
        )}
      </div>
    </header>
  );
}
