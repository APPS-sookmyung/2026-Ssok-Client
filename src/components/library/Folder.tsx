"use client";

import folderDefault from "@/assets/icons/folder/folder-default.svg";
import folderHover from "@/assets/icons/folder/folder-hover.svg";

export default function Folder() {
  return (
    <div className=" gap-1 flex flex-col items-center">
      <div className="group mx-2.75 my-4">
        <img
          src={folderDefault.src}
          alt="Default Folder Icon"
          className="group-hover:hidden"
        />
        <img
          src={folderHover.src}
          alt="Hover Folder Icon"
          className="hidden group-hover:block"
        />
      </div>
      <p className="font-normal text-body-lg text-black">Name</p>
    </div>
  );
}
