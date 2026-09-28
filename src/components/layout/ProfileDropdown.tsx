"use client";

import ProfileIcon from "@/assets/icons/common/profile.svg";

// 메뉴 고정값 (danger: 빨간 글씨)
const MENU_ITEMS = [
  { label: "설정", danger: false },
  { label: "계정 추가", danger: false },
  { label: "로그아웃", danger: true },
  { label: "회원탈퇴", danger: true },
] as const;

export type ProfileMenuLabel = (typeof MENU_ITEMS)[number]["label"];

interface ProfileDropdownProps {
  name: string;
  email: string;
  onSelect?: (label: ProfileMenuLabel) => void;
  onClose?: () => void;
}

export default function ProfileDropdown({
  name,
  email,
  onSelect,
  onClose,
}: ProfileDropdownProps) {
  return (
    <div
      role="menu"
      className="absolute right-0 top-full z-50 gap-2.5 w-94 rounded-3xl border border-gray-200 bg-white p-2 mt-12"
    >
      {/* 사용자 정보 */}
      <div className="flex items-center gap-4 p-4">
        <ProfileIcon className="h-12 w-12 shrink-0" aria-hidden="true" />
        <div className="min-w-0">
          <p className="truncate text-body-lg font-semibold text-black">
            {name}
          </p>
          <p className="truncate text-caption-lg font-semibold text-gray-500">
            {email}
          </p>
        </div>
      </div>

      {/* 메뉴 */}
      <ul className="flex flex-col">
        {MENU_ITEMS.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onSelect?.(item.label);
                onClose?.();
              }}
              className={`w-full rounded-lg p-3 text-left text-body-md font-semibold hover:bg-gray-100 active:bg-gray-200 ${item.danger ? "text-error-600" : "text-black"}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
