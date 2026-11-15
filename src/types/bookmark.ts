// 북마크에 달린 팀 코멘트
export interface BookmarkComment {
  id: string;
  authorName: string;
  authorProfileUrl?: string;
  content: string;
  createdAt: string; // YYYY-MM-DD
}

// 라이브러리에 저장된 북마크
export interface Bookmark {
  bookmarkId: number;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  savedBy: string; // 저장한 사람
  savedAt: string; // ISO 8601
  comments: BookmarkComment[];
}

export type BookmarkSort = "recent" | "oldest" | "title";
