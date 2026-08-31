"user client";

import addIcon from "@/assets/icons/common/add.svg";

export default function NewFolder() {
  return (
    <div className="flex align-middle justify-center">
      <img src={addIcon.src} className="w-16 h-16 object-contain" />
    </div>
  );
}
