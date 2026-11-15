"use client";

import { useCallback, useRef, useState } from "react";
import { Bookmark } from "@/types/bookmark";
import { useClickOutside } from "@/hooks/useClickOutside";
import BookmarkThumbnail from "@/components/bookmark/BookmarkThumbnail";
import TeamCommentBox, {
  TeamCommentBoxAlign,
} from "@/components/chat/TeamCommentBox";

import MeatballsIcon from "@/assets/icons/common/meatballs.svg";
import CommentIcon from "@/assets/icons/comment/comment-default.svg";

// 팝오버 너비(w-60) + 여유
const COMMENT_BOX_WIDTH = 256;

interface BookmarkCardProps {
  bookmark: Bookmark;
  isCommentOpen?: boolean;
  onCommentToggle: () => void;
  onCommentClose: () => void;
  onOpenDetail: () => void;
  onMoreClick?: () => void;
  onAddComment: (content: string) => void;
  onEditComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export default function BookmarkCard({
  bookmark,
  isCommentOpen = false,
  onCommentToggle,
  onCommentClose,
  onOpenDetail,
  onMoreClick,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: BookmarkCardProps) {
  const commentRef = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<TeamCommentBoxAlign>("left");

  const closeComment = useCallback(() => onCommentClose(), [onCommentClose]);
  useClickOutside(commentRef, closeComment, isCommentOpen);

  const handleCommentClick = () => {
    // 오른쪽 공간이 부족하면 팝오버를 아이콘 오른쪽 기준으로 정렬
    const rect = commentRef.current?.getBoundingClientRect();
    if (rect) {
      setAlign(
        window.innerWidth - rect.left < COMMENT_BOX_WIDTH ? "right" : "left",
      );
    }
    onCommentToggle();
  };

  const commentCount = bookmark.comments.length;

  return (
    <article
      className={`relative flex w-full min-w-0 flex-col rounded-xl border bg-white transition-colors ${
        isCommentOpen
          ? "border-primary-400"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* 1. 썸네일 */}
      <button
        type="button"
        onClick={onOpenDetail}
        aria-label={`${bookmark.title} 상세 보기`}
        className="block w-full"
      >
        <BookmarkThumbnail
          bookmark={bookmark}
          className="aspect-[206/128] w-full rounded-t-xl"
        />
      </button>

      {/* 더보기 */}
      {/* TODO: 북마크 더보기 메뉴(이동/공유/삭제) 구현 */}
      <button
        type="button"
        aria-label="북마크 더보기"
        onClick={onMoreClick}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900/30 transition-colors hover:bg-gray-900/50"
      >
        <MeatballsIcon
          className="h-5 w-5 [&_path]:fill-white"
          aria-hidden="true"
        />
      </button>

      {/* 2. 본문 */}
      <div className="flex flex-1 flex-col px-3 pb-2.5 pt-3">
        <button
          type="button"
          onClick={onOpenDetail}
          title={bookmark.title}
          className="block w-full truncate text-left text-body-lg font-semibold text-gray-900 underline underline-offset-2"
        >
          {bookmark.title}
        </button>
        <p className="mt-1 line-clamp-2 min-h-10 text-body-sm text-gray-500">
          {bookmark.description}
        </p>

        {/* 3. 하단 (저장한 사람 · 날짜 · 코멘트) */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="flex gap-1.5 text-caption-lg text-gray-500">
            <span>{bookmark.savedBy}</span>
            <span>{bookmark.savedAt.slice(0, 10)}</span>
          </p>

          <div ref={commentRef} className="relative">
            <button
              type="button"
              aria-label={`코멘트 ${commentCount}개`}
              aria-haspopup="dialog"
              aria-expanded={isCommentOpen}
              onClick={handleCommentClick}
              className="flex h-6 w-6 items-center justify-center"
            >
              <CommentIcon
                className={`h-5 w-5 transition-colors ${
                  isCommentOpen
                    ? "[&_path]:fill-gray-500"
                    : "[&_path]:fill-gray-300 hover:[&_path]:fill-gray-400"
                }`}
                aria-hidden="true"
              />
            </button>

            {isCommentOpen && (
              <TeamCommentBox
                comments={bookmark.comments}
                align={align}
                onAdd={onAddComment}
                onEdit={onEditComment}
                onDelete={onDeleteComment}
                onClose={onCommentClose}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
