import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 폰트 적용
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 900",
  variable: "--font-pretendard",
});

// 웹사이트 메타데이터
export const metadata: Metadata = {
  title: "쏙(Ssok) - 지능형 북마크 서비스",
  description: '필요한 정보를 "쏙" 찾아 "쏙" 정리해 드릴게요.',
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout = async ({
  params,
  children,
}: {
  params: Promise<any>;
  children: React.ReactNode;
}) => {
  console.log("RootLayout", await params);
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
