"use client";

import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { CHAT_PLACEHOLDER } from "@/constants/chat";
import { ChatAttachment, ChatSendInput } from "@/types/chat";
import { formatFileSize } from "@/components/chat/formatFileSize";

import PlusIcon from "@/assets/icons/common/plus.svg";
import FileIcon from "@/assets/icons/common/file.svg";
import ImageIcon from "@/assets/icons/common/image.svg";
import CancelIcon from "@/assets/icons/common/cancel.svg";
import SendDefaultIcon from "@/assets/icons/send/send-default.svg";
import SendDisabledIcon from "@/assets/icons/send/send-disabled.svg";

interface ChatInputProps {
  onSend: (input: ChatSendInput) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

const MAX_TEXTAREA_HEIGHT = 120;

export default function ChatInput({
  onSend,
  disabled = false,
  autoFocus = false,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState<ChatAttachment | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  useClickOutside(menuRef, closeMenu, isMenuOpen);

  const canSend = !disabled && (text.trim().length > 0 || attachment !== null);

  // 입력 내용에 맞춰 높이 자동 조절
  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    resizeTextarea();
  };

  const submit = () => {
    if (!canSend) return;
    onSend({ text, attachment: attachment ?? undefined });
    setText("");
    setAttachment(null);
    requestAnimationFrame(resizeTextarea);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 조합 중 Enter는 무시 (마지막 글자 중복 전송 방지)
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleFileSelect =
    (kind: ChatAttachment["kind"]) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      // TODO: 파일 업로드 API 연동
      setAttachment({
        kind,
        name: file.name,
        size: file.size,
        previewUrl: kind === "image" ? URL.createObjectURL(file) : undefined,
      });
      closeMenu();
      textareaRef.current?.focus();
    };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* 첨부 메뉴 */}
      <div
        ref={menuRef}
        onKeyDown={(e) => {
          // 메뉴가 열려 있을 때 ESC는 메뉴만 닫고 채팅 패널은 유지
          if (e.key === "Escape" && isMenuOpen) e.preventDefault();
        }}
      >
        {isMenuOpen && (
          <ul
            role="menu"
            className="absolute bottom-full left-0 z-10 mb-2 flex w-38 flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_2px_7.1px_-1.12px_rgba(40,13,0,0.16)]"
          >
            <li role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-body-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                <FileIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                파일 업로드
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => imageInputRef.current?.click()}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-body-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                <ImageIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                이미지 업로드
              </button>
            </li>
          </ul>
        )}

        <div className="flex flex-col gap-2 rounded-xl border border-transparent bg-gray-100 px-3 py-2.5 focus-within:border-primary-400">
          {/* 첨부 미리보기 */}
          {attachment && (
            <div className="flex w-fit max-w-full items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-1.5">
              {attachment.kind === "image" && attachment.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={attachment.previewUrl}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded object-cover"
                />
              ) : (
                <FileIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              )}
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-caption-lg font-semibold text-gray-900">
                  {attachment.name}
                </span>
                <span className="text-caption-sm text-gray-400">
                  {formatFileSize(attachment.size)}
                </span>
              </div>
              <button
                type="button"
                aria-label="첨부 삭제"
                onClick={() => setAttachment(null)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full hover:bg-gray-200"
              >
                <CancelIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}

          <div className="flex items-end gap-2">
            <button
              type="button"
              aria-label="파일 첨부"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 [&_path]:stroke-gray-500 ${isMenuOpen ? "bg-gray-200" : ""}`}
            >
              <PlusIcon className="h-4.5 w-4.5" aria-hidden="true" />
            </button>

            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={CHAT_PLACEHOLDER}
              aria-label="쏙에게 질문하기"
              autoFocus={autoFocus}
              className="min-w-0 flex-1 resize-none bg-transparent py-0.5 text-body-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none scrollbar-hide"
            />

            <button
              type="submit"
              aria-label="전송"
              disabled={!canSend}
              className="flex h-6 w-6 shrink-0 items-center justify-center disabled:cursor-not-allowed"
            >
              {canSend ? (
                <SendDefaultIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <SendDisabledIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.hwp,.ppt,.pptx,.xls,.xlsx,.txt"
        className="hidden"
        onChange={handleFileSelect("file")}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect("image")}
      />
    </form>
  );
}
