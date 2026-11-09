import { useRef, useState } from "react";
import { sendChatMessage } from "@/api/aiApi";
import { MOCK_CHAT_SESSIONS } from "@/constants/chat";
import { ChatMessage, ChatSendInput, ChatSession } from "@/types/chat";

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const TITLE_MAX_LENGTH = 20;

export function useAIChat() {
  // TODO: API 연동 후 서버의 대화 기록으로 교체
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_CHAT_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // 대화 전환/새 대화 시 이전 요청의 응답을 무시하기 위한 토큰
  const requestIdRef = useRef(0);

  const syncSession = (sessionId: string, next: ChatMessage[]) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, messages: next } : s)),
    );
  };

  const send = async (input: ChatSendInput) => {
    const text = input.text.trim();
    if ((!text && !input.attachment) || isLoading) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: text,
      attachment: input.attachment,
      createdAt: Date.now(),
    };
    const history = messages;
    const withUser = [...history, userMessage];

    // 새 대화라면 히스토리에 세션 추가
    let sessionId = activeSessionId;
    if (!sessionId) {
      sessionId = createId();
      const title =
        (text || input.attachment?.name || "새 대화").slice(0, TITLE_MAX_LENGTH);
      setSessions((prev) => [
        { id: sessionId!, title, messages: withUser },
        ...prev,
      ]);
      setActiveSessionId(sessionId);
    } else {
      syncSession(sessionId, withUser);
    }

    setMessages(withUser);
    setIsLoading(true);
    const requestId = ++requestIdRef.current;

    try {
      const reply = await sendChatMessage(history, { ...input, text });
      if (requestId !== requestIdRef.current) return;

      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: reply.content,
        links: reply.links,
        createdAt: Date.now(),
      };
      const next = [...withUser, assistantMessage];
      setMessages(next);
      syncSession(sessionId, next);
    } catch {
      if (requestId !== requestIdRef.current) return;
      const errorMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: "답변을 가져오지 못했어요. 잠시 후 다시 시도해주세요.",
        createdAt: Date.now(),
      };
      setMessages([...withUser, errorMessage]);
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  };

  // 새 대화 시작
  const startNewChat = () => {
    requestIdRef.current++;
    setIsLoading(false);
    setActiveSessionId(null);
    setMessages([]);
  };

  // 히스토리에서 대화 불러오기
  const selectSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;
    requestIdRef.current++;
    setIsLoading(false);
    setActiveSessionId(session.id);
    setMessages(session.messages);
  };

  return {
    messages,
    isLoading,
    sessions,
    activeSessionId,
    send,
    startNewChat,
    selectSession,
  };
}

export type AIChat = ReturnType<typeof useAIChat>;
