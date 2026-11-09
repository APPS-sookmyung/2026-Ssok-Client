import { ChatMessage, ChatSession } from "@/types/chat";

export const CHAT_PLACEHOLDER = "기억을 입력해보세요...";

// TODO: API 연동 후 제거
const MEDIA_PAPER_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "그때 그거있잖아.... 한 5월 중순쯤에 저장했는데 미디어 관련 논문이었고",
    createdAt: 0,
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "아, 5월에 생성한 '제42회 제아페' 팀 스페이스와 관련된 논문인가요? 'Z세대와 미디어 리터러시', 'AI시대 미디어의 역할' 으로 후보를 추릴 수 있습니다!",
    createdAt: 0,
  },
  {
    id: "m3",
    role: "user",
    content: "Z세대와 미디어 리터러시 였던 것 같은데 정확히는 모르겠네 둘 다 가져와봐",
    createdAt: 0,
  },
  {
    id: "m4",
    role: "assistant",
    content: "말씀하신 링크를 가져왔습니다. 궁금한 게 더 있다면 질문해주세요!",
    links: [
      { id: "l1", title: "Z세대와 미디어 리터러시", url: "https://example.com/media-literacy" },
      { id: "l2", title: "AI시대 미디어의 역할", url: "https://example.com/ai-media" },
    ],
    createdAt: 0,
  },
];

const HISTORY_TITLES = [
  "A 기획팀 레퍼런스",
  "UX·UI 수상작",
  "코스피 지수와 주식 차트",
  "스타트업 코드",
  "6월 13일의 기억 찾기",
  "붉은색 이미지의 단화",
  "바이브 코딩",
  "팀 스페이스 찾기",
  "코멘트 관련 질문",
  "검색 기능 활용",
  "공모전 파일 질문",
  "중간고사 관련 파일 찾기",
  "공모전 수상작 찾기",
];

// TODO: API 연동 후 제거
export const MOCK_CHAT_SESSIONS: ChatSession[] = [
  { id: "s0", title: "미디어 논문 관련 질문", messages: MEDIA_PAPER_MESSAGES },
  ...HISTORY_TITLES.map((title, i) => ({
    id: `s${i + 1}`,
    title,
    messages: [
      { id: `s${i + 1}-u`, role: "user" as const, content: title, createdAt: 0 },
      {
        id: `s${i + 1}-a`,
        role: "assistant" as const,
        content: `'${title}'와 관련된 자료를 라이브러리에서 찾아봤어요. 더 궁금한 게 있다면 질문해주세요!`,
        createdAt: 0,
      },
    ],
  })),
];
