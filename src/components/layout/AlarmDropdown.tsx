"use client";

import ProfileIcon from "@/assets/icons/common/profile.svg";

export interface AlarmItem {
  id: string | number;
  message: string;
  time: string;
  isRead?: boolean;
  onClick?: () => void;
}

interface AlarmDropdownProps {
  alarms: AlarmItem[];
  onClose?: () => void;
}

export default function AlarmDropdown({ alarms, onClose }: AlarmDropdownProps) {
  return (
    <div
      role="menu"
      className="mt-12 absolute right-0 top-full z-50 gap-4 w-94 flex max-h-92 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white px-4 pt-4"
    >
      {alarms.length === 0 ? (
        <p className="px-4 py-6 text-center text-body-md text-gray-400">
          새로운 알림이 없어요
        </p>
      ) : (
        <ul className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
          {alarms.map((alarm) => (
            <li key={alarm.id}>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  alarm.onClick?.();
                  onClose?.();
                }}
                className="flex w-full items-center rounded-lg gap-4 p-3 text-left hover:bg-gray-100 active:bg-gray-200"
              >
                <ProfileIcon
                  className="h-12 w-12 shrink-0"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1 gap-4">
                  <p className="truncate text-body-sm text-gray-900 font-semibold">
                    {alarm.message}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-caption-lg text-gray-500">
                      {alarm.time}
                    </span>
                    {!alarm.isRead && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-primary-400"
                        aria-label="읽지 않음"
                      />
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
