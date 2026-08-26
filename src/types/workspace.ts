export type WorkspaceType = "PERSONAL" | "TEAM";

// 개별 스페이스 데이터 구조
export interface SpaceItem {
  spaceId: number;
  name: string;
  type: WorkspaceType;
  bookmarkCount: number;
}

// 스페이스 목록 성공 응답
export interface SpaceListResponse {
  status: number;
  success: true;
  message: string;
  data: SpaceItem[];
}

// 실패 응답
export interface ErrorResponse {
  status: number;
  success: false;
  message: string;
}
