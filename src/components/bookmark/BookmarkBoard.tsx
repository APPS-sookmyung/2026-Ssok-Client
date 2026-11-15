"use client";

import { useCallback, useRef, useState } from "react";
import { Bookmark, BookmarkSort } from "@/types/bookmark";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useClickOutside } from "@/hooks/useClickOutside";
import { closeChat } from "@/store/useUiStore";
import { MOCK_LIBRARY_NAME } from "@/constants/mockBookmarks";
import IconCircle from "@/components/common/IconCircle";
import BookmarkCard from "@/components/bookmark/BookmarkCard";
import BookmarkDetail from "@/components/bookmark/BookmarkDetail";

import ArrowRightIcon from "@/assets/icons/arrow/arrow-right.svg";
import ArrowDownIcon from "@/assets/icons/arrow/arrow-down.svg";
import SearchIcon from "@/assets/icons/common/search.svg";
import CancelIcon from "@/assets/icons/common/cancel.svg";
import FolderMoveIcon from "@/assets/icons/common/folder-move.svg";
import ShareIcon from "@/assets/icons/common/share.svg";
import TrashIcon from "@/assets/icons/common/trash.svg";

const SORT_OPTIONS: { value: BookmarkSort; label: string }[] = [
  { value: "recent", label: "최근 저장 순" },
  { value: "oldest", label: "오래된 순" },
  { value: "title", label: "이름 순" },
];

const sortBookmarks = (list: Bookmark[], sort: BookmarkSort) =>
  [...list].sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title, "ko");
    const diff = a.savedAt.localeCompare(b.savedAt);
    return sort === "recent" ? -diff : diff;
  });

// 정렬 드롭다운
function SortDropdown({
  value,
  onChange,
}: {
  value: BookmarkSort;
  onChange: (value: BookmarkSort) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(ref, close, isOpen);

  const current = SORT_OPTIONS.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-body-sm font-semibold text-gray-700 hover:text-gray-900"
      >
        {current?.label}
        <ArrowDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-2 w-32 rounded-xl border border-gray-200 bg-white p-1 shadow-[0_2px_7.1px_-1.12px_rgba(40,13,0,0.16)]"
        >
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  close();
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-body-sm font-semibold hover:bg-gray-100 ${option.value === value ? "text-primary-400" : "text-gray-900"}`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 라이브러리 상세: 툴바 + 북마크 카드 그리드 + 북마크 상세 패널
// 부모(본문 영역)에 relative가 있어야 상세 패널이 헤더 아래에 위치함
export default function BookmarkBoard({
  libraryName = MOCK_LIBRARY_NAME,
}: {
  libraryName?: string;
}) {
  const { bookmarks, addComment, editComment, deleteComment } = useBookmarks();
  const [sort, setSort] = useState<BookmarkSort>("recent");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);

  const keyword = query.trim().toLowerCase();
  const visibleBookmarks = sortBookmarks(
    keyword
      ? bookmarks.filter((b) =>
          `${b.title} ${b.description}`.toLowerCase().includes(keyword),
        )
      : bookmarks,
    sort,
  );
  const detailBookmark = bookmarks.find((b) => b.bookmarkId === detailId);

  const closeComment = useCallback(() => setOpenCommentId(null), []);
  const closeDetail = useCallback(() => setDetailId(null), []);

  const openDetail = (bookmarkId: number) => {
    closeChat();
    setOpenCommentId(null);
    setDetailId(bookmarkId);
  };

  const closeSearch = () => {
    setQuery("");
    setIsSearchOpen(false);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        {/* 1. 경로 + 검색 */}
        <div className="flex h-9 items-center justify-between">
          <nav aria-label="경로" className="flex items-center gap-2">
            <span className="text-body-sm font-semibold text-gray-500">
              라이브러리
            </span>
            <ArrowRightIcon
              className="h-4 w-4 [&_path]:stroke-gray-500"
              aria-hidden="true"
            />
            <h1 className="text-heading-lg font-semibold text-gray-900">
              {libraryName}
            </h1>
          </nav>

          {isSearchOpen ? (
            <div className="flex h-9 w-64 items-center rounded-full border border-primary-400 bg-white pl-4 pr-1">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                placeholder="라이브러리 내 검색"
                aria-label="라이브러리 내 검색"
                className="min-w-0 flex-1 bg-transparent text-body-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <IconCircle
                icon={CancelIcon}
                altText="검색 닫기"
                size="sm"
                onClick={closeSearch}
              />
            </div>
          ) : (
            <IconCircle
              icon={SearchIcon}
              altText="라이브러리 내 검색"
              size="md"
              onClick={() => setIsSearchOpen(true)}
              className="border border-gray-200 bg-white [&_svg]:h-4.5 [&_svg]:w-4.5"
            />
          )}
        </div>

        {/* 2. 툴바 + 정렬 */}
        {/* TODO: 북마크 선택 후 이동/공유/삭제 기능 연동 */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-500">
            <IconCircle icon={FolderMoveIcon} altText="이동" size="md" />
            <IconCircle icon={ShareIcon} altText="공유" size="md" />
            <IconCircle icon={TrashIcon} altText="삭제" size="md" />
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* 3. 북마크 카드 그리드 */}
        {visibleBookmarks.length > 0 ? (
          <ul className="mt-5 grid grid-cols-2 gap-4 pb-24 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleBookmarks.map((bookmark) => {
              const id = bookmark.bookmarkId;
              return (
                <li key={id} className="flex min-w-0">
                  <BookmarkCard
                    bookmark={bookmark}
                    isCommentOpen={openCommentId === id}
                    onCommentToggle={() =>
                      setOpenCommentId((prev) => (prev === id ? null : id))
                    }
                    onCommentClose={closeComment}
                    onOpenDetail={() => openDetail(id)}
                    onAddComment={(content) => addComment(id, content)}
                    onEditComment={(commentId, content) =>
                      editComment(id, commentId, content)
                    }
                    onDeleteComment={(commentId) => deleteComment(id, commentId)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-20 text-center text-body-md text-gray-500">
            {keyword ? "검색 결과가 없어요." : "저장된 북마크가 없어요."}
          </p>
        )}
      </main>

      {detailBookmark && (
        <BookmarkDetail
          key={detailBookmark.bookmarkId}
          bookmark={detailBookmark}
          onClose={closeDetail}
          onAddComment={(content) =>
            addComment(detailBookmark.bookmarkId, content)
          }
          onEditComment={(commentId, content) =>
            editComment(detailBookmark.bookmarkId, commentId, content)
          }
          onDeleteComment={(commentId) =>
            deleteComment(detailBookmark.bookmarkId, commentId)
          }
        />
      )}
    </>
  );
}
