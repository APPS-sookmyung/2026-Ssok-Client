"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

import CancelIcon from "@/assets/icons/common/cancel.svg";
import LinkIcon from "@/assets/icons/common/link.svg";
import ProfileIcon from "@/assets/icons/common/profile.svg";
import ArrowDownIcon from "@/assets/icons/arrow/arrow-down.svg";

export const MEMBER_ROLES = ["뷰어", "편집자"] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

export interface InviteMember {
  id: string | number;
  name: string;
  role: MemberRole;
}

interface InviteModalProps {
  members: InviteMember[];
  /** 복사할 스페이스 링크 (기본값: 현재 페이지 URL) */
  spaceLink?: string;
  onInvite?: (email: string) => void;
  onRoleChange?: (memberId: InviteMember["id"], role: MemberRole) => void;
  onClose: () => void;
}

export default function InviteModal({
  members,
  spaceLink,
  onInvite,
  onRoleChange,
  onClose,
}: InviteModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [openRoleId, setOpenRoleId] = useState<InviteMember["id"] | null>(null);

  // 역할 드롭다운이 열려있으면 ESC/바깥 클릭은 드롭다운만 닫음
  const handleOutside = useCallback(() => {
    if (openRoleId !== null) setOpenRoleId(null);
    else onClose();
  }, [openRoleId, onClose]);
  useClickOutside(panelRef, handleOutside);

  // 모달이 열려있는 동안 배경 스크롤 방지
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // 링크 복사 피드백 타이머
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(spaceLink ?? window.location.href);
      setCopied(true);
    } catch {
      // 클립보드 권한이 없는 환경은 무시
    }
  };

  const trimmedEmail = email.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trimmedEmail) return;
    onInvite?.(trimmedEmail);
    setEmail("");
  };

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center bg-black/30 pt-26">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-modal-title"
        className="flex max-h-[calc(100vh-8rem)] w-130 flex-col rounded-3xl bg-gray-50 p-6 shadow-xl"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h2
            id="invite-modal-title"
            className="text-heading-sm font-semibold text-gray-900"
          >
            팀원 초대
          </h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
          >
            <CancelIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* 링크 복사 */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="mt-6 flex w-fit items-center gap-1 text-body-lg font-semibold text-primary-400 hover:text-primary-600 active:text-primary-700"
        >
          <LinkIcon className="h-4 w-4" aria-hidden="true" />
          {copied ? "링크가 복사되었어요" : "스페이스 링크 복사"}
        </button>

        {/* 이메일 초대 */}
        <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="초대 메일을 보내 팀원을 초대하세요"
            aria-label="초대할 팀원 이메일"
            className="h-10.5 min-w-0 flex-1 rounded-lg bg-gray-100 px-6 text-body-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-400"
          />
          <button
            type="submit"
            className="h-10.5 w-33 shrink-0 rounded-lg bg-primary-400 text-body-md font-semibold text-primary-50 transition-colors hover:bg-primary-800 active:bg-primary-700"
          >
            초대
          </button>
        </form>

        {/* 멤버 목록 */}
        <ul className="scrollbar-hide mt-4 max-h-90 min-h-0 flex-1 overflow-y-auto">
          {members.map((member, index) => {
            const isOpen = openRoleId === member.id;
            // 목록 하단 항목은 드롭다운이 잘리지 않도록 위로 열기
            const openUpward =
              members.length > 3 && index >= members.length - 2;

            return (
              <li
                key={member.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <ProfileIcon
                    className="h-9 w-9 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate text-body-lg font-semibold text-gray-900">
                    {member.name}
                  </span>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setOpenRoleId(isOpen ? null : member.id)}
                    className="flex items-center gap-1 rounded-md px-1 py-0.5 text-body-md font-semibold text-gray-500 hover:bg-gray-200"
                  >
                    {member.role}
                    <ArrowDownIcon
                      className={`h-4 w-4 transition-transform [&_path]:stroke-gray-500 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <ul
                      role="listbox"
                      aria-label={`${member.name} 권한`}
                      className={`absolute right-0 z-10 w-45 rounded-2xl border border-gray-200 bg-white p-3 ${openUpward ? "bottom-full mb-2" : "top-full mt-2"}`}
                    >
                      {MEMBER_ROLES.map((role) => (
                        <li key={role}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={member.role === role}
                            onClick={() => {
                              onRoleChange?.(member.id, role);
                              setOpenRoleId(null);
                            }}
                            className={`w-full rounded-xl p-4 text-left text-body-md font-semibold hover:bg-gray-100 active:bg-gray-200 ${member.role === role ? "text-primary-400" : "text-gray-900"}`}
                          >
                            {role}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
