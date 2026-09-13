"use client";

import { ButtonHTMLAttributes, ElementType } from "react";

export type IconCircleSize = "sm" | "md" | "lg";

interface IconCircleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType;
  iconColor?: string;
  altText?: string;
  size?: IconCircleSize;
}

// 1. 고정 규격 매핑
const fixedButtonStyles: Record<IconCircleSize, string> = {
  sm: "h-6 w-6",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

const fixedIconStyles: Record<IconCircleSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-8 w-8",
};

export default function IconCircle({
  icon: Icon,
  iconColor = "",
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
        ${iconColor} 
        ${className}
      `}
      {...props}
    >
      <Icon
        className={`${iconSizeClass} shrink-0 transition-colors`}
        aria-hidden="true"
      />
    </button>
  );
}
