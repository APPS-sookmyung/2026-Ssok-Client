"use client";

import IconCircle from "@/components/common/IconCircle";

import LinkIcon from "@/assets/icons/common/link.svg";
import SsokIcon from "@/assets/icons/common/ssok.svg";

export default function Floating() {
  return (
    <div className="flex bg-primary-400 gap-2 p-2 rounded-full w-32 h-16 justify-center items-center shadow-[0_2px_7.1px_-1.12px_rgba(40,13,0,0.34)]">
      <IconCircle
        icon={LinkIcon}
        altText="Link Icon"
        size="lg"
        iconColor="text-white"
        className="hover:bg-primary-500 active:bg-primary-600"
      />
      <IconCircle
        icon={SsokIcon}
        altText="Ssok Icon"
        size="lg"
        iconColor="text-white"
        className="hover:bg-primary-500 active:bg-primary-600"
      />
    </div>
  );
}
