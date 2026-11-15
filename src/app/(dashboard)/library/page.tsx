import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import BookmarkBoard from "@/components/bookmark/BookmarkBoard";
import SsokChat from "@/components/chat/SsokChat";

// 라이브러리 상세 (북마크 목록 · 코멘트 · 상세 패널)
// TODO: 라이브러리 id 라우팅 및 API 연동
export default function LibraryPage() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white">
      <Header variant="default" />

      <div className="relative flex flex-1 overflow-hidden">
        <aside className="shrink-0 overflow-y-auto border-r border-gray-100 bg-white">
          <Sidebar />
        </aside>

        <BookmarkBoard />

        <SsokChat />
      </div>
    </div>
  );
}
