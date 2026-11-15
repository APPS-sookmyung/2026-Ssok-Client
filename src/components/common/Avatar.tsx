import ProfileIcon from "@/assets/icons/common/profile.svg";

export type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

// 프로필 이미지 (없으면 기본 프로필 아이콘)
export default function Avatar({
  src,
  name = "",
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClass = `${sizeStyles[size]} shrink-0 rounded-full ${className}`;

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className={`${sizeClass} object-cover`} />
    );
  }
  return <ProfileIcon className={sizeClass} aria-hidden="true" />;
}
