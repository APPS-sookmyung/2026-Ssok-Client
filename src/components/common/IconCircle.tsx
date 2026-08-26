"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

export type IconCircleSize = "sm" | "lg";

interface IconCircleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  altText?: string;
  size?: IconCircleSize;
}

// 1. 고정 규격 매핑
const fixedButtonStyles: Record<IconCircleSize, string> = {
  sm: "h-8 w-8",
  lg: "h-13 w-13",
};

const fixedIconStyles: Record<IconCircleSize, string> = {
  sm: "h-6 w-6",
  lg: "h-10 w-10",
};

export default function IconCircle({
  icon,
  altText,
  size,
  className = "",
  type = "button",
  onClick,
  ...props
}: IconCircleProps) {
  const buttonSizeClass = size
    ? fixedButtonStyles[size]
    : "h-8 w-8 md:h-13 md:w-13";

  const iconSizeClass = size
    ? fixedIconStyles[size]
    : "h-6 w-6 md:h-10 md:w-10";

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={altText}
      className={`
        inline-flex items-center justify-center rounded-full select-none
        hover:bg-gray-200 active:bg-gray-300 focus:outline-none
        disabled:opacity-40 disabled:cursor-not-allowed
        ${buttonSizeClass}
        ${className}
      `}
      {...props}
    >
      <span
        className={`flex items-center justify-center pointer-events-none ${iconSizeClass}`}
      >
        {icon}
      </span>
    </button>
  );
}
