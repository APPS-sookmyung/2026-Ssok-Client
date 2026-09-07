"use client";

import { ButtonHTMLAttributes, useState } from "react";
import UserIcon from "@/assets/icons/common/user.svg";
import TeamIcon from "@/assets/icons/common/team.svg";

export type SpaceVariant = "User" | "Team";

interface SpaceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SpaceVariant;
  spaceName?: string;
  isSelected?: boolean;
  isEditing?: boolean;
  onRenameSubmit?: (newName: string) => void;
  onRenameCancel?: () => void;
}

export default function SpaceButton({
  variant = "User",
  spaceName = "My Space",
  isSelected = false,
  isEditing = false,
  onRenameSubmit,
  onRenameCancel,
  className = "",
  type = "button",
  ...props
}: SpaceButtonProps) {
  const [editValue, setEditValue] = useState(spaceName);
  const iconSrc =
    variant === "User" ? UserIcon.src || UserIcon : TeamIcon.src || TeamIcon;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      onRenameSubmit?.(editValue.trim() || spaceName);
    } else if (e.key === "Escape") {
      setEditValue(spaceName);
      onRenameCancel?.();
    }
  };

  return (
    <button
      type={type}
      className={`
        flex items-center w-full h-12 px-3 rounded-xl transition-colors select-none cursor-pointer gap-3 text-left
        ${
          isSelected
            ? "bg-gray-200 text-gray-900 font-bold"
            : "text-gray-900 hover:bg-gray-100  font-semibold"
        }
        ${className}
      `}
      {...props}
    >
      <img
        src={iconSrc}
        alt={variant === "User" ? "개인 스페이스" : "팀 스페이스"}
        className="h-6 w-6 shrink-0 object-contain"
      />

      {/* 수정 모드 분기 처리 */}
      {isEditing ? (
        <input
          type="text"
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => onRenameSubmit?.(editValue.trim() || spaceName)}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-gray-200 rounded-sm text-body-lg text-gray-500 font-semibold focus:outline-none"
        />
      ) : (
        <span className="truncate text-body-lg rounded-sm">{spaceName}</span>
      )}
    </button>
  );
}
