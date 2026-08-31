import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RecentSites from "@/components/library/RecentSites";
import Folder from "@/components/library/Folder";
import NewFolder from "@/components/library/NewFolder";

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
        <main className="flex-1 overflow-y-auto bg-gray-200 p-8">
          <div>
            <div className="pb-20">
              <div className="text-body-lg font-semibold text-gray-900 pb-6">
                최근 저장 사이트 &gt;{" "}
              </div>
              <div className="grid grid-cols-5 items-center justify-center gap-4">
                <RecentSites />
              </div>
            </div>
            <div>
              <div className="text-gray-900 gap-1 pb-6 text-body-lg font-semibold">
                라이브러리
              </div>
              <div className="grid grid-cols-7 items-center justify-center gap-10">
                <Folder />
                <NewFolder />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
