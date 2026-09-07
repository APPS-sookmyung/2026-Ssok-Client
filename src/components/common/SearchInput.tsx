"use client";

import { InputHTMLAttributes, useState } from "react";
import SearchIcon from "@/assets/icons/common/search.svg";

export type SearchInputSize = "sm" | "md" | "lg";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  size?: SearchInputSize;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

// 고정 크기 스타일 매핑
const fixedSizeStyles: Record<
  SearchInputSize,
  { container: string; icon: string }
> = {
  sm: {
    container: "h-10.5 px-4 py-2 rounded-lg text-body-sm",
    icon: "w-6 h-6",
  },
  md: {
    container: "h-14 px-6 py-3 rounded-2xl text-body-md",
    icon: "w-8 h-8",
  },
  lg: {
    container: "h-15 px-6 py-3.5 rounded-2xl text-body-md",
    icon: "w-8 h-8",
  },
};

export default function SearchInput({
  size,
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSearch,
  placeholder = "Placeholder",
  className = "",
  disabled = false,
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const hasValue = String(currentValue ?? "").trim().length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleSearchSubmit = () => {
    onSearch?.(String(currentValue || ""));
  };

  // size prop 유무에 따른 클래스 분기
  const containerSizeClass = size
    ? fixedSizeStyles[size].container
    : "h-13 px-6 py-2 rounded-xl text-body-sm md:h-14 md:px-6 md:py-3 md:rounded-2xl md:text-body-md lg:h-15 lg:px-6 lg:py-3.5 lg:rounded-2xl lg:text-body-md";

  const iconSizeClass = size
    ? fixedSizeStyles[size].icon
    : "w-6.5 h-6.5 md:w-8 md:h-8";

  return (
    <div
      className={`
        flex items-center w-full transition-all select-none font-semibold
        bg-gray-100 border border-transparent
        focus-within:bg-gray-100 focus-within:border-primary-400
        ${hasValue ? "bg-gray-100" : ""}
        ${containerSizeClass}
        ${className}
      `}
    >
      <input
        type="text"
        disabled={disabled}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
        className="w-full bg-transparent font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
        {...props}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={handleSearchSubmit}
        className="shrink-0 ml-2 cursor-pointer disabled:cursor-not-allowed"
      >
        <img
          src={SearchIcon.src || SearchIcon}
          alt="Search"
          className={iconSizeClass}
        />
      </button>
    </div>
  );
}
