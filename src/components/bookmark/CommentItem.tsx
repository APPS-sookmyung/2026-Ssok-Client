"use client";

import { KeyboardEvent, useCallback, useRef, useState } from "react";
import { BookmarkComment } from "@/types/bookmark";
import { useClickOutside } from "@/hooks/useClickOutside";
import Avatar from "@/components/common/Avatar";

import MeatballsIcon from "@/assets/icons/common/meatballs.svg";

export type CommentItemVariant = "compact" | "default";

interface CommentItemProps {
  comment: BookmarkComment;
  // compact: 카드 코멘트 팝오버 / default: 상세 패널
  variant?: CommentItemVariant;
  onEdit: (content: string) => void;
  onDelete: () => void;
}

const variantStyles: Record<
  CommentItemVariant,
  { avatar: "sm" | "md"; name: string; content: string; gap: string }
> = {
  compact: {
    avatar: "sm",
    name: "text-body-sm",
    content: "text-body-sm",
    gap: "mt-1.5",
  },
  default: {
    avatar: "md",
    name: "text-body-md",
    content: "text-body-md",
    gap: "mt-2",
  },
};

export default function CommentItem({
  comment,
  variant = "default",
  onEdit,
  onDelete,
}: CommentItemProps) {
  const styles = variantStyles[variant];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  useClickOutside(menuRef, closeMenu, isMenuOpen);

  const submitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== comment.content) onEdit(trimmed);
    else setDraft(comment.content);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter 무시
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      submitEdit();
    } else if (e.key === "Escape") {
      // 상위 팝오버/패널까지 닫히지 않도록
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setDraft(comment.content);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex flex-col">
      <div className="flex items-center gap-2">
        <Avatar
          src={comment.authorProfileUrl}
          name={comment.authorName}
          size={styles.avatar}
        />
        <span className={`${styles.name} font-semibold text-gray-900`}>
          {comment.authorName}
        </span>
        <span className="text-caption-lg text-gray-400">
          {comment.createdAt}
        </span>

        {/* 더보기 메뉴 */}
        {/* TODO: 권한 API 연동 후 작성자 본인/관리자에게만 노출 */}
        <div ref={menuRef} className="relative ml-auto">
          <button
            type="button"
            aria-label="코멘트 더보기"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 ${isMenuOpen ? "bg-gray-200" : ""}`}
          >
            <MeatballsIcon className="h-4 w-4" aria-hidden="true" />
          </button>

          {isMenuOpen && (
            <ul
              role="menu"
              className="absolute right-0 top-full z-10 mt-1 w-24 rounded-lg border border-gray-200 bg-white p-1 shadow-[0_2px_7.1px_-1.12px_rgba(40,13,0,0.16)]"
            >
              <li>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setDraft(comment.content);
                    setIsEditing(true);
                    closeMenu();
                  }}
                  className="w-full rounded-md px-3 py-1.5 text-left text-body-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  수정
                </button>
              </li>
              <li>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    closeMenu();
                    onDelete();
                  }}
                  className="w-full rounded-md px-3 py-1.5 text-left text-body-sm font-semibold text-error-600 hover:bg-gray-100"
                >
                  삭제
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {isEditing ? (
        <input
          type="text"
          autoFocus
          value={draft}
          aria-label="코멘트 수정"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleEditKeyDown}
          onBlur={submitEdit}
          className={`${styles.gap} ${styles.content} w-full rounded-md bg-gray-100 px-2 py-1 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-400`}
        />
      ) : (
        <p
          className={`${styles.gap} ${styles.content} whitespace-pre-wrap break-words text-gray-900`}
        >
          {comment.content}
        </p>
      )}
    </li>
  );
}
