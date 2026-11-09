"use client";

import { useRef, useState } from "react";
import { ChatSession } from "@/types/chat";

import SearchIcon from "@/assets/icons/common/search.svg";

interface ChatHistorySidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelect: (sessionId: string) => void;
}

export default function ChatHistorySidebar({
  sessions,
  activeSessionId,
  onSelect,
}: ChatHistorySidebarProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const keyword = query.trim().toLowerCase();
  const filtered = keyword
    ? sessions.filter((s) => s.title.toLowerCase().includes(keyword))
    : sessions;

  return (
    <nav
      aria-label="대화 기록"
      className="flex h-full w-65 shrink-0 flex-col border-l border-gray-200 bg-white"
    >
      <div className="flex h-15 shrink-0 items-center justify-end gap-2 px-4">
        {isSearching && (
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                setQuery("");
                setIsSearching(false);
              }
            }}
            placeholder="대화 검색"
            aria-label="대화 기록 검색"
            className="h-8 min-w-0 flex-1 rounded-lg bg-gray-100 px-3 text-body-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          />
        )}
        <button
          type="button"
          aria-label="대화 기록 검색"
          aria-pressed={isSearching}
          onClick={() => {
            setIsSearching((prev) => !prev);
            setQuery("");
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 [&_*]:stroke-gray-400"
        >
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 pb-4 scrollbar-hide">
        {filtered.map((session) => {
          const isActive = session.id === activeSessionId;
          return (
            <li key={session.id}>
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(session.id)}
                className={`w-full truncate rounded-lg px-3 py-2.5 text-left text-body-sm font-medium text-gray-900 hover:bg-gray-100 ${isActive ? "bg-gray-200 hover:bg-gray-200" : ""}`}
              >
                {session.title}
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-3 py-2.5 text-body-sm text-gray-400">
            검색 결과가 없어요
          </li>
        )}
      </ul>
    </nav>
  );
}
