"use client";

import Link from "next/link";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import IconCircle from "@/components/common/IconCircle";
import ProfileDropdown, {
  ProfileMenuLabel,
} from "@/components/layout/ProfileDropdown";
import AlarmDropdown, { AlarmItem } from "@/components/layout/AlarmDropdown";
import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

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
  alarms?: AlarmItem[];
  profileName?: string;
  profileEmail?: string;
  onProfileMenuSelect?: (label: ProfileMenuLabel) => void;
}

// TODO: API 연동 후 제거
const MOCK_ALARMS: AlarmItem[] = [
  { id: 1, message: "‘박지훈’님이 회원님을 언급했습니다.", time: "방금 전" },
  {
    id: 2,
    message: "‘박지훈’님이 ‘4학기 팀플’ 초대를 수락하였습니다.",
    time: "5일 전",
  },
  {
    id: 3,
    message: "‘박지훈’님이 ‘4학기 팀플’에 초대되었습니다.",
    time: "5일 전",
  },
  {
    id: 4,
    message:
      "‘박정현’ 님이 ‘제42회 제아페’ 스페이스에서 회원님을 언급했습니다.",
    time: "1주 전",
    isRead: true,
  },
  {
    id: 5,
    message: "‘교내 창업대회’ 스페이스에 ‘김민서’ 님 외 3명이 초대되었습니다.",
    time: "2주 전",
    isRead: true,
  },
];

type OpenMenu = "alarm" | "profile" | null;

export default function Header({
  variant = "default",
  onInvite,
  onInstall,
  onAlarmClick,
  onProfileClick,
  alarms = MOCK_ALARMS,
  profileName = "최가온",
  profileEmail = "gagaon1234@sookmyung.ac.kr",
  onProfileMenuSelect,
}: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setOpenMenu(null), []);
  useClickOutside(actionsRef, closeMenu, openMenu !== null);

  const toggleMenu = (menu: Exclude<OpenMenu, null>) =>
    setOpenMenu((prev) => (prev === menu ? null : menu));

  return (
    <header
      className={`top-0 flex h-26 w-full items-center justify-between ${variant === "default" ? "border-b border-primary-400" : ""} px-8 py-4`}
    >
      {/* 1. 좌측 로고 */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/ssok/logo.svg"
            alt="Logo"
            className="h-14 w-auto object-contain"
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

            <div
              ref={actionsRef}
              className="relative flex items-center align-middle gap-3"
            >
              <IconCircle
                icon={AlarmIcon}
                altText="Alarm"
                aria-haspopup="menu"
                aria-expanded={openMenu === "alarm"}
                onClick={() => {
                  toggleMenu("alarm");
                  onAlarmClick?.();
                }}
                size="lg"
                className={openMenu === "alarm" ? "bg-gray-300" : ""}
              />
              <IconCircle
                icon={MyIcon}
                altText="내 프로필"
                aria-haspopup="menu"
                aria-expanded={openMenu === "profile"}
                onClick={() => {
                  toggleMenu("profile");
                  onProfileClick?.();
                }}
                size="lg"
                className={openMenu === "profile" ? "bg-gray-300" : ""}
              />

              {openMenu === "alarm" && (
                <AlarmDropdown alarms={alarms} onClose={closeMenu} />
              )}
              {openMenu === "profile" && (
                <ProfileDropdown
                  name={profileName}
                  email={profileEmail}
                  onSelect={onProfileMenuSelect}
                  onClose={closeMenu}
                />
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
