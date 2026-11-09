"use client";

import { useEffect, useRef } from "react";
import IconCircle from "@/components/common/IconCircle";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessageItem, {
  ThinkingMessage,
} from "@/components/chat/ChatMessageItem";
import ChatHistorySidebar from "@/components/chat/ChatHistorySidebar";
import { AIChat } from "@/hooks/useAIChat";
import {
  ChatUiState,
  toggleChatExpanded,
  toggleChatHistory,
} from "@/store/useUiStore";

import SsokCharacterIcon from "@/assets/icons/common/ssok-character.svg";
import ExpandIcon from "@/assets/icons/common/expand.svg";
import ReduceIcon from "@/assets/icons/common/reduce.svg";
import NewChatIcon from "@/assets/icons/common/new.svg";
import SidebarIcon from "@/assets/icons/common/sidebar.svg";

interface AIChatBoxProps {
  chat: AIChat;
  ui: ChatUiState;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <SsokCharacterIcon
        className="h-20 w-20 text-primary-400"
        aria-hidden="true"
      />
      <p className="text-heading-lg font-semibold text-primary-400">
        어떤 파일을 찾으시나요?
        <br />
        쏙쏙 찾아드릴게요!
      </p>
    </div>
  );
}

export default function AIChatBox({ chat, ui }: AIChatBoxProps) {
  const { messages, isLoading, sessions, activeSessionId } = chat;
  const { isExpanded, isHistoryOpen } = ui;
  const isEmpty = messages.length === 0;

  const scrollRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가되면 맨 아래로 스크롤
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  // 전체화면에서는 본문을 가운데 정렬된 좁은 컬럼으로
  const columnClass = isExpanded ? "mx-auto w-full max-w-170" : "w-full";

  return (
    <section
      role="dialog"
      aria-label="쏙 AI 검색"
      className={`flex bg-white ${
        isExpanded
          ? "fixed inset-0 z-50"
          : "absolute inset-y-0 right-0 z-30 shadow-[-4px_0_12px_0_rgba(25,4,0,0.08)]"
      }`}
    >
      <div
        className={`flex h-full min-w-0 flex-col ${isExpanded ? "flex-1" : "w-93"}`}
      >
        {/* 상단 툴바 */}
        <div className="flex h-15 shrink-0 items-center justify-between px-3">
          <IconCircle
            icon={isExpanded ? ReduceIcon : ExpandIcon}
            altText={isExpanded ? "기본 화면으로" : "전체 화면으로"}
            size="md"
            onClick={toggleChatExpanded}
            className="[&_svg]:h-4.5 [&_svg]:w-4.5"
          />
          <div className="flex items-center gap-1">
            <IconCircle
              icon={NewChatIcon}
              altText="새 대화"
              size="md"
              onClick={chat.startNewChat}
              className="[&_path]:stroke-gray-400"
            />
            <IconCircle
              icon={SidebarIcon}
              altText="대화 기록"
              aria-pressed={isHistoryOpen}
              size="md"
              onClick={toggleChatHistory}
              className={`[&_path]:stroke-gray-400 ${isHistoryOpen ? "bg-gray-200" : ""}`}
            />
          </div>
        </div>

        {isEmpty ? (
          // 빈 화면: 기본 패널은 입력창이 하단, 전체화면은 가운데 함께 배치
          <div
            className={`flex flex-1 flex-col items-center px-4 ${isExpanded ? "justify-center gap-10 pb-15" : "justify-center pb-15"}`}
          >
            <EmptyState />
            {isExpanded && (
              <div className="w-full max-w-100">
                <ChatInput onSend={chat.send} autoFocus />
              </div>
            )}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 pt-2 pb-4 scrollbar-hide"
          >
            <div className={`flex flex-col gap-6 ${columnClass}`}>
              {messages.map((message) => (
                <ChatMessageItem key={message.id} message={message} />
              ))}
              {isLoading && <ThinkingMessage />}
            </div>
          </div>
        )}

        {!(isExpanded && isEmpty) && (
          <div className="shrink-0 px-4 pb-4">
            <div className={columnClass}>
              <ChatInput
                onSend={chat.send}
                disabled={isLoading}
                autoFocus={isEmpty}
              />
            </div>
          </div>
        )}
      </div>

      {isHistoryOpen && (
        <ChatHistorySidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelect={chat.selectSession}
        />
      )}
    </section>
  );
}
