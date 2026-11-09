import { useSyncExternalStore } from "react";

// 쏙 채팅 패널 UI 상태 (플로팅 버튼 · 채팅 패널 · 레이아웃이 함께 사용)
export interface ChatUiState {
  isOpen: boolean;
  isExpanded: boolean;
  isHistoryOpen: boolean;
}

const INITIAL_STATE: ChatUiState = {
  isOpen: false,
  isExpanded: false,
  isHistoryOpen: false,
};

let state: ChatUiState = INITIAL_STATE;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => state;
const getServerSnapshot = () => INITIAL_STATE;

const setState = (partial: Partial<ChatUiState>) => {
  state = { ...state, ...partial };
  listeners.forEach((listener) => listener());
};

export const openChat = () => setState({ isOpen: true });
export const closeChat = () => setState({ isOpen: false, isExpanded: false });
export const toggleChat = () => (state.isOpen ? closeChat() : openChat());
export const toggleChatExpanded = () =>
  setState({ isExpanded: !state.isExpanded });
export const toggleChatHistory = () =>
  setState({ isHistoryOpen: !state.isHistoryOpen });

export function useChatUi() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
