import { ChatMessage, ChatReply, ChatSendInput } from "@/types/chat";

const MOCK_DELAY = 1200;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// AI 채팅 메시지 전송
// TODO: 실제 AI 검색 API 연동 (현재는 시안 흐름을 재현하는 목업 응답)
export async function sendChatMessage(
  history: ChatMessage[],
  input: ChatSendInput,
): Promise<ChatReply> {
  await wait(MOCK_DELAY);

  if (input.attachment) {
    return {
      content:
        "현재 회원님의 라이브러리에서는 확인되지 않네요. 다른 키워드가 있을까요?",
    };
  }

  const hasAssistantReply = history.some((m) => m.role === "assistant");
  if (!hasAssistantReply) {
    return {
      content:
        "아, 5월에 생성한 '제42회 제아페' 팀 스페이스와 관련된 논문인가요? 'Z세대와 미디어 리터러시', 'AI시대 미디어의 역할' 으로 후보를 추릴 수 있습니다!",
    };
  }

  return {
    content: "말씀하신 링크를 가져왔습니다. 궁금한 게 더 있다면 질문해주세요!",
    links: [
      { id: `l-${Date.now()}-1`, title: "Z세대와 미디어 리터러시", url: "https://example.com/media-literacy" },
      { id: `l-${Date.now()}-2`, title: "AI시대 미디어의 역할", url: "https://example.com/ai-media" },
    ],
  };
}
