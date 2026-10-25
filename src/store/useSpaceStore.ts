import { useSyncExternalStore } from "react";
import { SpaceItem, WorkspaceType } from "@/types/workspace";
import { MOCK_SPACE_RESPONSE } from "@/constants/mockSpaces";

// 사이드바와 링크 업로드 드롭다운이 함께 쓰는 스페이스 목록
// TODO: API 연동 후 서버 데이터로 교체
let spaces: SpaceItem[] = MOCK_SPACE_RESPONSE.data;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => spaces;

export function addSpace(name: string, type: WorkspaceType): SpaceItem {
  const newSpace: SpaceItem = {
    spaceId: Date.now(),
    name,
    type,
    bookmarkCount: 0,
  };
  spaces = [...spaces, newSpace];
  listeners.forEach((listener) => listener());
  return newSpace;
}

export function useSpaces() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
