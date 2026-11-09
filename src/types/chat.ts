export type ChatRole = "user" | "assistant";

// AI가 찾아준 북마크 링크
export interface ChatLink {
  id: string;
  title: string;
  url: string;
  libraryId?: number;
}

// 사용자가 첨부한 파일/이미지
export interface ChatAttachment {
  kind: "image" | "file";
  name: string;
  size: number; // byte
  previewUrl?: string; // 이미지 미리보기 (object URL)
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  attachment?: ChatAttachment;
  links?: ChatLink[];
  createdAt: number;
}

// 대화 기록 (히스토리 사이드바 항목)
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
}

// 메시지 전송 시 입력값
export interface ChatSendInput {
  text: string;
  attachment?: ChatAttachment;
}

// AI 응답
export interface ChatReply {
  content: string;
  links?: ChatLink[];
}
