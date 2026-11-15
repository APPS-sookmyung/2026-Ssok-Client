"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { BookmarkComment } from "@/types/bookmark";
import { CURRENT_USER } from "@/constants/mockBookmarks";
import { formatDate } from "@/components/bookmark/formatDate";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import CommentItem from "@/components/bookmark/CommentItem";

export type TeamCommentBoxAlign = "left" | "right";

interface TeamCommentBoxProps {
  comments: BookmarkComment[];
  align?: TeamCommentBoxAlign;
  onAdd: (content: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  onClose: () => void;
}

// 북마크 카드의 코멘트 아이콘을 누르면 열리는 팀 코멘트 팝오버
// 부모(코멘트 아이콘 래퍼)에 relative가 있어야 아이콘 바로 아래에 위치함
export default function TeamCommentBox({
  comments,
  align = "left",
  onAdd,
  onEdit,
  onDelete,
  onClose,
}: TeamCommentBoxProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const canSubmit = text.trim().length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 새 코멘트가 추가되면 목록 맨 아래로
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [comments.length]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAdd(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter로 폼이 제출되지 않도록
    if (e.key === "Enter" && e.nativeEvent.isComposing) e.preventDefault();
  };

  return (
    <div
      role="dialog"
      aria-label="코멘트"
      className={`absolute top-full z-30 mt-2 flex w-60 flex-col gap-3 rounded-2xl border border-primary-400 bg-white p-3 shadow-[0_11px_17.3px_0_rgba(25,4,0,0.12),0_2px_7.1px_-1.12px_rgba(40,13,0,0.16)] ${align === "left" ? "left-0" : "right-0"}`}
    >
      {comments.length === 0 ? (
        // 첫 코멘트: 작성자 정보만 표시
        <div className="flex items-center gap-2">
          <Avatar
            src={CURRENT_USER.profileUrl}
            name={CURRENT_USER.name}
            size="sm"
          />
          <span className="text-body-sm font-semibold text-gray-900">
            {CURRENT_USER.name}
          </span>
          <span className="text-caption-lg text-gray-400">{formatDate()}</span>
        </div>
      ) : (
        <ul
          ref={listRef}
          className="flex max-h-72 flex-col gap-4 overflow-y-auto scrollbar-hide"
        >
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              variant="compact"
              onEdit={(content) => onEdit(comment.id, content)}
              onDelete={() => onDelete(comment.id)}
            />
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="코멘트를 작성하세요..."
          aria-label="코멘트 작성"
          className="h-8 w-full rounded-lg bg-gray-100 px-3 text-body-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
        />
        <div className="grid grid-cols-2 gap-1.5">
          <Button
            color="secondary"
            size="sm"
            className="w-full rounded-lg"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="submit"
            color="primary"
            size="sm"
            className="w-full rounded-lg"
            disabled={!canSubmit}
          >
            작성
          </Button>
        </div>
      </form>
    </div>
  );
}
