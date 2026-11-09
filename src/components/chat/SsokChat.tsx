"use client";

import { useEffect } from "react";
import Floating from "@/components/common/Floating";
import AIChatBox from "@/components/chat/AIChatBox";
import { useAIChat } from "@/hooks/useAIChat";
import {
  closeChat,
  toggleChat,
  toggleChatExpanded,
  useChatUi,
} from "@/store/useUiStore";

// 패널 너비 (AIChatBox의 w-93, ChatHistorySidebar의 w-65와 동일)
const PANEL_WIDTH = 372;
const HISTORY_WIDTH = 260;
const FLOATING_GAP = 24;

// 플로팅 버튼 + 딤 + 우측 AI 채팅 패널
// 부모(본문 영역)에 relative가 있어야 딤/패널이 헤더 아래에 위치함
export default function SsokChat() {
  const ui = useChatUi();
  // 패널을 닫아도 대화 내용이 유지되도록 상위에서 상태 보관
  const chat = useAIChat();

  // ESC: 전체화면이면 축소, 아니면 닫기
  useEffect(() => {
    if (!ui.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      if (ui.isExpanded) toggleChatExpanded();
      else closeChat();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [ui.isOpen, ui.isExpanded]);

  const floatingRight =
    FLOATING_GAP +
    (ui.isOpen && !ui.isExpanded
      ? PANEL_WIDTH + (ui.isHistoryOpen ? HISTORY_WIDTH : 0)
      : 0);

  return (
    <>
      {ui.isOpen && !ui.isExpanded && (
        <div
          aria-hidden="true"
          onClick={closeChat}
          className="absolute inset-0 z-20 bg-black/30"
        />
      )}

      {ui.isOpen && <AIChatBox chat={chat} ui={ui} />}

      <div
        className="fixed bottom-16 z-40 transition-[right] duration-200"
        style={{ right: floatingRight }}
      >
        <Floating isChatOpen={ui.isOpen} onChatToggle={toggleChat} />
      </div>
    </>
  );
}
