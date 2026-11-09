"use client";

import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import IconCircle from "@/components/common/IconCircle";
import LinkUploadDropdown from "@/components/library/LinkUploadDropdown";

import LinkIcon from "@/assets/icons/common/link.svg";
import SsokIcon from "@/assets/icons/common/ssok.svg";

interface FloatingProps {
  isChatOpen?: boolean;
  onChatToggle?: () => void;
}

export default function Floating({
  isChatOpen = false,
  onChatToggle,
}: FloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLinkUploadOpen, setIsLinkUploadOpen] = useState(false);

  const closeLinkUpload = useCallback(() => setIsLinkUploadOpen(false), []);
  useClickOutside(containerRef, closeLinkUpload, isLinkUploadOpen);

  return (
    <div ref={containerRef} className="relative">
      {isLinkUploadOpen && <LinkUploadDropdown onClose={closeLinkUpload} />}

      <div className="flex bg-primary-400 gap-2 p-2 rounded-full w-32 h-16 justify-center items-center shadow-[0_2px_7.1px_-1.12px_rgba(40,13,0,0.34)]">
        <IconCircle
          icon={LinkIcon}
          altText="링크 업로드"
          aria-haspopup="dialog"
          aria-expanded={isLinkUploadOpen}
          onClick={() => setIsLinkUploadOpen((prev) => !prev)}
          size="lg"
          iconColor="text-white"
          className={`hover:bg-primary-500 active:bg-primary-600 ${isLinkUploadOpen ? "bg-primary-600" : ""}`}
        />
        <IconCircle
          icon={SsokIcon}
          altText={isChatOpen ? "쏙 AI 검색 닫기" : "쏙 AI 검색 열기"}
          aria-pressed={isChatOpen}
          onClick={() => {
            closeLinkUpload();
            onChatToggle?.();
          }}
          size="lg"
          iconColor="text-white"
          className={`hover:bg-primary-500 active:bg-primary-600 ${isChatOpen ? "bg-primary-600" : ""}`}
        />
      </div>
    </div>
  );
}
