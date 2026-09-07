"use client";

import { useState } from "react";
import { SpaceVariant } from "./SpaceButton";
import UserIcon from "@/assets/icons/common/user.svg";
import TeamIcon from "@/assets/icons/common/team.svg";

interface SpaceInputProps {
  variant?: SpaceVariant;
  placeholder?: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export default function SpaceInput({
  variant = "User",
  placeholder = "이름없는 스페이스",
  onSubmit,
  onCancel,
}: SpaceInputProps) {
  const [name, setName] = useState("");
  const iconSrc =
    variant === "User" ? UserIcon.src || UserIcon : TeamIcon.src || TeamIcon;

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    } else {
      onCancel();
    }
  };

  return (
    <div className="flex h-12 w-full items-center gap-3 rounded-xl px-3 transition-colors">
      {/* SpaceButton과 동일한 아이콘 규격 */}
      <img
        src={iconSrc}
        alt={variant === "User" ? "개인 스페이스" : "팀 스페이스"}
        className="h-6 w-6 shrink-0 object-contain"
      />

      {/* 인라인 텍스트 인풋 */}
      <input
        type="text"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") onCancel();
        }}
        onBlur={handleSubmit}
        placeholder={placeholder}
        className="w-full bg-gray-200 text-body-lg rounded-sm font-semibold text-gray-500 placeholder:font-semibold placeholder:text-gray-500 focus:outline-none"
      />
    </div>
  );
}
