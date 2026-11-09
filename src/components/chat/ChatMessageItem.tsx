"use client";

import Link from "next/link";
import { ChatLink, ChatMessage } from "@/types/chat";
import { formatFileSize } from "@/components/chat/formatFileSize";

import SsokCharacterIcon from "@/assets/icons/common/ssok-character.svg";
import FileIcon from "@/assets/icons/common/file.svg";
import ArrowRightIcon from "@/assets/icons/arrow/arrow-right.svg";

function AssistantAvatar() {
  return (
    <SsokCharacterIcon
      className="h-5.5 w-5.5 shrink-0 text-primary-400"
      aria-hidden="true"
    />
  );
}

function LinkCard({ link }: { link: ChatLink }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl bg-gray-200 px-4 py-3">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-0 truncate text-body-sm font-semibold text-gray-900 underline underline-offset-2"
      >
        {link.title}
      </a>
      {/* TODO: 북마크가 저장된 라이브러리 경로로 이동 */}
      <Link
        href="/library"
        className="flex shrink-0 items-center gap-0.5 text-caption-lg font-semibold text-gray-600 hover:text-gray-900 [&_path]:stroke-current"
      >
        라이브러리로 이동
        <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </li>
  );
}

export function ThinkingMessage() {
  return (
    <div className="flex items-center gap-2" role="status">
      <AssistantAvatar />
      <span className="text-body-sm font-medium text-gray-500 animate-pulse">
        생각 중...
      </span>
    </div>
  );
}

export default function ChatMessageItem({ message }: { message: ChatMessage }) {
  if (message.role === "assistant") {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <AssistantAvatar />
          <p className="whitespace-pre-wrap break-words text-body-sm font-medium text-gray-900">
            {message.content}
          </p>
        </div>
        {message.links && message.links.length > 0 && (
          <ul className="flex flex-col gap-2">
            {message.links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </ul>
        )}
      </div>
    );
  }

  const { attachment } = message;

  return (
    <div className="flex flex-col items-end gap-2">
      {attachment?.kind === "image" && attachment.previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={attachment.previewUrl}
          alt={attachment.name}
          className="max-h-60 w-3/4 max-w-80 rounded-xl object-cover"
        />
      )}
      {attachment?.kind === "file" && (
        <div className="flex w-3/4 max-w-80 items-center gap-3 rounded-xl bg-gray-100 px-4 py-3">
          <FileIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-body-sm font-semibold text-gray-900">
              {attachment.name}
            </span>
            <span className="text-caption-sm text-gray-400">
              {formatFileSize(attachment.size)}
            </span>
          </div>
        </div>
      )}
      {message.content && (
        <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-xl bg-gray-100 px-4 py-2.5 text-body-sm font-medium text-gray-900">
          {message.content}
        </p>
      )}
    </div>
  );
}
