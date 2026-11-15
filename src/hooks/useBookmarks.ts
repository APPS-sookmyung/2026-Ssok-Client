import { useState } from "react";
import { Bookmark, BookmarkComment } from "@/types/bookmark";
import { CURRENT_USER, MOCK_BOOKMARKS } from "@/constants/mockBookmarks";
import { formatDate } from "@/components/bookmark/formatDate";

export interface CommentActions {
  addComment: (bookmarkId: number, content: string) => void;
  editComment: (bookmarkId: number, commentId: string, content: string) => void;
  deleteComment: (bookmarkId: number, commentId: string) => void;
}

// 라이브러리 북마크 + 코멘트 상태
// 카드의 코멘트 팝오버와 상세 패널이 같은 코멘트 목록을 공유함
// TODO: API 연동 후 서버 데이터로 교체
export function useBookmarks(initial: Bookmark[] = MOCK_BOOKMARKS) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initial);

  const updateComments = (
    bookmarkId: number,
    updater: (comments: BookmarkComment[]) => BookmarkComment[],
  ) =>
    setBookmarks((prev) =>
      prev.map((b) =>
        b.bookmarkId === bookmarkId ? { ...b, comments: updater(b.comments) } : b,
      ),
    );

  const actions: CommentActions = {
    addComment: (bookmarkId, content) =>
      // TODO: 코멘트 작성 API 연동
      updateComments(bookmarkId, (comments) => [
        ...comments,
        {
          id: `c-${bookmarkId}-${Date.now()}`,
          authorName: CURRENT_USER.name,
          authorProfileUrl: CURRENT_USER.profileUrl,
          content,
          createdAt: formatDate(new Date()),
        },
      ]),
    editComment: (bookmarkId, commentId, content) =>
      // TODO: 코멘트 수정 API 연동
      updateComments(bookmarkId, (comments) =>
        comments.map((c) => (c.id === commentId ? { ...c, content } : c)),
      ),
    deleteComment: (bookmarkId, commentId) =>
      // TODO: 코멘트 삭제 API 연동
      updateComments(bookmarkId, (comments) =>
        comments.filter((c) => c.id !== commentId),
      ),
  };

  return { bookmarks, ...actions };
}
