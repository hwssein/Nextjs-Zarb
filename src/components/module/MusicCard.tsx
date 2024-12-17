"use client";

import { useState } from "react";
import Image from "next/image";

import { Bool, musicPlayerProps } from "@/types/types";
import MusicPlayer from "../element/MusicPlayer";

function MusicCard({
  name,
  artist,
  url,
  category,
  language,
}: musicPlayerProps) {
  const [isPlay, setIsPlay] = useState<Bool>(false);

  return (
    <>
      {isPlay ? (
        <MusicPlayer url={url} isPlay={isPlay} setIsPlay={setIsPlay} />
      ) : (
        <div
          onClick={() => setIsPlay(true)}
          className="w-full flex items-center justify-start gap-1 cursor-pointer bg-secondary rounded-md"
        >
          <Image
            src="/images/music-card.png"
            width={200}
            height={200}
            alt="card cover"
            className="w-16 rounded-md mr-2 p-1"
          ></Image>

          <div className="w-full flex flex-col items-start justify-start gap-0.5 capitalize">
            <span className="w-full">{name}</span>
            <span className="w-full">{artist}</span>
            <div className="w-full flex items-center justify-start gap-2 text-stroke">
              <span>{category}</span>
              <span>{language}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MusicCard;
