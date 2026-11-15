"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { Bookmark } from "@/types/bookmark";
import BookmarkThumbnail from "@/components/bookmark/BookmarkThumbnail";
import CommentItem from "@/components/bookmark/CommentItem";

import CancelCircleIcon from "@/assets/icons/common/cancel-circle.svg";
import SendDefaultIcon from "@/assets/icons/send/send-default.svg";
import SendDisabledIcon from "@/assets/icons/send/send-disabled.svg";

interface BookmarkDetailProps {
  bookmark: Bookmark;
  onClose: () => void;
  onAddComment: (content: string) => void;
  onEditComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
}

// 북마크 상세 우측 패널
// 부모(본문 영역)에 relative가 있어야 헤더 아래에 위치함
export default function BookmarkDetail({
  bookmark,
  onClose,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: BookmarkDetailProps) {
  const [text, setText] = useState("");
  const canSubmit = text.trim().length > 0;

  // ESC로 닫기
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAddComment(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter로 폼이 제출되지 않도록
    if (e.key === "Enter" && e.nativeEvent.isComposing) e.preventDefault();
  };

  return (
    <section
      role="dialog"
      aria-label={`${bookmark.title} 상세`}
      className="absolute inset-y-0 right-0 z-30 flex w-100 flex-col bg-white shadow-[-4px_0_12px_0_rgba(25,4,0,0.08)]"
    >
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* 1. 썸네일 + 닫기 */}
        <div className="relative">
          <BookmarkThumbnail bookmark={bookmark} className="aspect-[16/10] w-full" />
          <button
            type="button"
            aria-label="상세 닫기"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
          >
            <CancelCircleIcon className="h-9 w-9" aria-hidden="true" />
          </button>
        </div>

        {/* 하단 플로팅 버튼에 가려지지 않도록 여백 */}
        <div className="px-6 pb-36 pt-8">
          {/* 2. 북마크 정보 */}
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-heading-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-primary-500"
          >
            {bookmark.title}
          </a>
          <p className="mt-2 text-body-md text-gray-500">
            {bookmark.description}
          </p>
          <div className="mt-6 flex items-center justify-between text-body-sm text-gray-500">
            <span>{bookmark.savedBy} 님이 저장함</span>
            <span>{bookmark.savedAt.slice(0, 10)}</span>
          </div>

          {/* 3. 코멘트 입력 */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex h-12 items-center rounded-xl bg-gray-100 pl-4 pr-2 focus-within:ring-1 focus-within:ring-primary-400"
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="코멘트를 입력하세요!"
              aria-label="코멘트 작성"
              className="min-w-0 flex-1 bg-transparent text-body-md text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="코멘트 등록"
              disabled={!canSubmit}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed"
            >
              {canSubmit ? (
                <SendDefaultIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <SendDisabledIcon
                  className="h-6 w-6 [&_path]:fill-gray-300"
                  aria-hidden="true"
                />
              )}
            </button>
          </form>

          {/* 4. 코멘트 목록 */}
          {bookmark.comments.length > 0 ? (
            <ul className="mt-6 flex flex-col gap-6">
              {bookmark.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onEdit={(content) => onEditComment(comment.id, content)}
                  onDelete={() => onDeleteComment(comment.id)}
                />
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-center text-body-sm text-gray-400">
              아직 코멘트가 없어요. 첫 코멘트를 남겨보세요!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
