import { Bookmark } from "@/types/bookmark";

// 썸네일 이미지가 없을 때 쓰는 임시 이미지 (쏙쏙이)
import SsokCharacter from "@/assets/icons/common/ssok-character.svg";

interface BookmarkThumbnailProps {
  bookmark: Pick<Bookmark, "thumbnailUrl" | "title">;
  className?: string;
}

// 북마크 썸네일 (이미지가 없으면 쏙쏙이 플레이스홀더)
// TODO: 북마크 API의 썸네일 이미지 연동
export default function BookmarkThumbnail({
  bookmark,
  className = "",
}: BookmarkThumbnailProps) {
  return (
    <div className={`overflow-hidden bg-primary-50 ${className}`}>
      {bookmark.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bookmark.thumbnailUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <SsokCharacter className="h-2/5 w-auto" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
