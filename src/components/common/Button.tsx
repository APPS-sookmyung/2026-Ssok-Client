"use client";

import {
  ButtonHTMLAttributes,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";

// 1. 모드별 허용 색상 분리
export type DefaultButtonColor = "primary" | "secondary" | "danger" | "warning";
export type TextButtonColor = "primary" | "secondary" | "danger";

export type ButtonSize = "lg" | "md" | "sm";

// 2. Props 타입 정의
type BaseButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> & {
  children?: ReactNode;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type DefaultVariantProps = BaseButtonProps & {
  variant?: "default";
  color?: DefaultButtonColor;
};

type TextVariantProps = BaseButtonProps & {
  variant: "text";
  color?: TextButtonColor;
};

export type ButtonProps = DefaultVariantProps | TextVariantProps;

// 3. 외형 스타일
const sizeStyles: Record<"default" | "text", Record<ButtonSize, string>> = {
  default: {
    lg: "h-16 px-6 py-3.5 text-heading-sm gap-3 rounded-2xl",
    md: "h-13 px-5 py-2.5 text-body-lg gap-2 rounded-[10px]",
    sm: "h-10.5 px-4 py-2 text-body-sm gap-1.5 rounded-lg",
  },
  text: {
    lg: "h-auto py-3 text-heading-sm gap-1",
    md: "h-auto py-2 text-body-lg gap-1",
    sm: "h-auto py-1 text-body-md gap-1",
  },
};

// 4. 아이콘 규격
const iconSizeStyles: Record<"default" | "text", Record<ButtonSize, string>> = {
  default: {
    lg: "w-6 h-6",
    md: "w-4 h-4",
    sm: "w-3.5 h-3.5",
  },
  text: {
    lg: "w-5 h-5",
    md: "w-5 h-5",
    sm: "w-4.5 h-4.5",
  },
};

// 5. 색상 스타일
const colorStyles = {
  default: {
    primary:
      "bg-primary-400 text-primary-50 hover:bg-primary-800 active:bg-primary-700 disabled:bg-gray-100 disabled:text-gray-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-300",
    danger:
      "bg-error-600 text-error-50 hover:bg-error-700 active:bg-error-800 disabled:bg-gray-100 disabled:text-gray-300",
    warning:
      "bg-error-50 text-error-600 hover:bg-error-100 active:bg-error-100 disabled:bg-gray-100 disabled:text-gray-300",
  },
  text: {
    primary:
      "bg-transparent text-primary-400 hover:text-primary-600 active:text-primary-700 disabled:text-gray-200",
    secondary:
      "bg-transparent text-gray-500 hover:text-gray-600 active:text-gray-700 disabled:text-gray-200",
    danger:
      "bg-transparent text-error-600 hover:text-error-700 active:text-error-800 disabled:text-gray-200",
  },
};

export default function Button({
  children = "Button",
  variant = "default",
  color = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className = "",
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) {
  const renderIcon = (icon: ReactNode) => {
    if (!isValidElement(icon)) return null;
    return cloneElement(icon as React.ReactElement<{ className?: string }>, {
      className:
        `${iconSizeStyles[variant][size]} ${(icon.props as { className?: string })?.className || ""}`.trim(),
    });
  };

  // variant에 맞춰 올바른 colorStyle 선택
  const activeColorStyle =
    variant === "text"
      ? colorStyles.text[color as TextButtonColor]
      : colorStyles.default[color as DefaultButtonColor];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-medium transition-all select-none
        disabled:cursor-not-allowed
        ${sizeStyles[variant][size]}
        ${activeColorStyle}
        ${className}
      `}
      {...props}
    >
      {leftIcon && renderIcon(leftIcon)}
      <span>{children}</span>
      {rightIcon && renderIcon(rightIcon)}
    </button>
  );
}
