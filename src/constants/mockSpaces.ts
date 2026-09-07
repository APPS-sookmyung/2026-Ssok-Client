import { SpaceListResponse } from "@/types/workspace";

export const MOCK_SPACE_RESPONSE: SpaceListResponse = {
  status: 200,
  success: true,
  message: "space list retrieved successfully",
  data: [
    {
      spaceId: 1,
      name: "개인",
      type: "PERSONAL",
      bookmarkCount: 35,
    },
    {
      spaceId: 2,
      name: "캡스톤 프로젝트",
      type: "TEAM",
      bookmarkCount: 82,
    },
  ],
};
