"use client";

import { FormEvent, useRef, useState } from "react";
import { SpaceItem } from "@/types/workspace";
import { useSpaces } from "@/store/useSpaceStore";

import CancelIcon from "@/assets/icons/common/cancel.svg";
import SearchIcon from "@/assets/icons/common/search.svg";
import ArrowDownIcon from "@/assets/icons/arrow/arrow-down.svg";

export interface LinkUploadPayload {
  url: string;
  spaceId: SpaceItem["spaceId"];
  library: string | null;
}

interface LinkUploadDropdownProps {
  libraries?: string[];
  onSave?: (payload: LinkUploadPayload) => void;
  onClose: () => void;
}

// TODO: API 연동 후 제거
const MOCK_LIBRARIES = [
  "UX/UI 스터디",
  "포트폴리오",
  "중간고사",
  "BX 스터디",
  "바이브 코딩",
  "공모전",
];

export default function LinkUploadDropdown({
  libraries = MOCK_LIBRARIES,
  onSave,
  onClose,
}: LinkUploadDropdownProps) {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const spaces = useSpaces();
  const personalSpaces = spaces.filter((s) => s.type === "PERSONAL");
  const teamSpaces = spaces.filter((s) => s.type === "TEAM");
  const [spaceId, setSpaceId] = useState<SpaceItem["spaceId"] | null>(
    personalSpaces[0]?.spaceId ?? spaces[0]?.spaceId ?? null,
  );
  const selectedSpace = spaces.find((s) => s.spaceId === spaceId);
  const [libraryQuery, setLibraryQuery] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);

  const keyword = libraryQuery.trim().toLowerCase();
  const filteredLibraries = keyword
    ? libraries.filter((name) => name.toLowerCase().includes(keyword))
    : libraries;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      urlInputRef.current?.focus();
      return;
    }
    if (spaceId === null) return;
    // TODO: 북마크 저장 API 연동
    onSave?.({
      url: trimmedUrl,
      spaceId,
      library: selectedLibrary,
    });
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="dialog"
      aria-labelledby="link-upload-title"
      className="absolute bottom-full right-17 z-50 mb-4 flex w-70 flex-col rounded-3xl bg-white p-5 shadow-[0_0_8.6px_0_rgba(0,0,0,0.17),0_11px_17.3px_0_rgba(25,4,0,0.25),0_2px_7.1px_-1.12px_rgba(40,13,0,0.16)]"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2
          id="link-upload-title"
          className="text-body-md font-semibold text-gray-900"
        >
          링크 업로드
        </h2>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200"
        >
          <CancelIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* 링크 입력 */}
      <input
        ref={urlInputRef}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="링크 복사하기..."
        aria-label="저장할 링크"
        className="mt-4 h-8 w-full rounded-lg bg-gray-100 px-4 text-caption-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-400"
      />

      {/* 저장할 스페이스 */}
      <span
        id="link-upload-space-label"
        className="mt-5 text-caption-sm font-medium text-gray-700"
      >
        저장할 스페이스
      </span>
      {/* TODO: 스페이스 API 연동 후 스페이스 목록 드롭다운 구현 */}
      <button
        type="button"
        aria-labelledby="link-upload-space-label"
        className="mt-2 flex h-9.5 w-full items-center justify-between rounded-lg bg-gray-200 pl-3 pr-3 text-left text-caption-lg font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-400"
      >
        <span className="truncate">{selectedSpace?.name}</span>
        <ArrowDownIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
      </button>

      {/* 라이브러리 */}
      <label
        htmlFor="link-upload-library"
        className="mt-5 text-caption-sm font-medium text-gray-700"
      >
        라이브러리
      </label>
      <div className="mt-2 flex h-8 items-center rounded-lg bg-gray-100 pl-4 pr-2 focus-within:ring-1 focus-within:ring-primary-400">
        <input
          id="link-upload-library"
          type="text"
          value={libraryQuery}
          onChange={(e) => setLibraryQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          placeholder="라이브러리를 검색해보세요"
          className="min-w-0 flex-1 bg-transparent text-caption-lg text-gray-900 placeholder:text-gray-500 focus:outline-none"
        />
        <SearchIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
      </div>

      <ul className="mt-2 flex flex-wrap gap-1.5">
        {filteredLibraries.map((name) => {
          const isSelected = selectedLibrary === name;
          return (
            <li key={name}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedLibrary(isSelected ? null : name)}
                className={`h-6.5 rounded-full border bg-white px-2 text-caption-lg font-semibold ${isSelected ? "border-primary-400 text-primary-400" : "border-gray-300 text-gray-900"}`}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>

      {/* 저장 */}
      <button
        type="submit"
        className="mt-4 h-9.5 w-full rounded-lg bg-primary-400 text-body-md font-semibold text-primary-50 transition-colors hover:bg-primary-800 active:bg-primary-700"
      >
        저장
      </button>
    </form>
  );
}
