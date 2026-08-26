import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function MainPage() {
  // '/onboarding'으로 이동
  // redirect("/onboarding");

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white">
      {/* 1. 상단 헤더 */}
      <Header variant="default" />

      {/* 2. 하단 본문 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측 사이드바 영역 */}
        <aside className="shrink-0 border-r border-gray-100 bg-white overflow-y-auto">
          <Sidebar />
        </aside>

        {/* 우측 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto bg-gray-50/30 p-8">
          <div className="flex h-full items-center justify-center">
            <p>lorem ipsum</p>
          </div>
        </main>
      </div>
    </div>
  );
}
