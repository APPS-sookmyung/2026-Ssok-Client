"use client";

import { useState } from "react";
import FolderDefault from "@/assets/icons/folder/folder-default.svg";
import FolderHover from "@/assets/icons/folder/folder-hover.svg";

export default function Folder() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="gap-1 flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* group 클래스와 hidden/block 클래스를 제거하고 React state로 교체 */}
      <div className="mx-2.75 my-4 w-28">
        {isHovered ? (
          <FolderHover className="block" />
        ) : (
          <FolderDefault className="block" />
        )}
      </div>
      <p className="font-normal text-body-lg text-black">Name</p>
    </div>
  );
}
