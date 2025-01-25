import Image from "next/image";
import { EllipsisVertical } from "lucide-react";

function MusicCard({ name, artist }: { name: string; artist: string }) {
  return (
    <>
      <div className="w-full h-16 bg-secondary flex items-center justify-between rounded pr-1">
        <div className="w-full flex items-center justify-start gap-1">
          <Image
            src="/images/music-card.png"
            width={100}
            height={100}
            alt="card cover"
            className="w-16 rounded-md mr-2 p-1"
            priority={false}
          ></Image>

          <div className="w-full flex flex-col items-start justify-start gap-1 capitalize overflow-hidden">
            <strong className="w-full overflow-x-auto scrollbar-hidden whitespace-nowrap font-medium">
              {name}
            </strong>
            <strong className="w-full overflow-x-auto scrollbar-hidden font-normal whitespace-nowrap">
              {artist}
            </strong>
          </div>
        </div>

        <span className="w-6 flex items-center justify-center">
          <EllipsisVertical />
        </span>
      </div>
    </>
  );
}

export default MusicCard;
