"use client";

import { memo } from "react";

import { Music } from "@/types/types";

import MusicCard from "../module/MusicCard";
import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

interface PlayerPlaylistProps {
  musics: Array<Music>;
  setCurrentMusic: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

function PlayerPlaylist({
  musics,
  setCurrentMusic,
  setIsOpenSheet,
}: PlayerPlaylistProps) {
  const selectHandler = (index: number) => {
    setCurrentMusic(index);
    setIsOpenSheet(false);
  };
  return (
    <>
      <SheetHeader>
        <SheetTitle className="w-full uppercase text-center mb-4">
          all musics
        </SheetTitle>

        <SheetDescription asChild>
          <div className="w-full flex flex-col items-center justify-start gap-2">
            {musics.map((item, index) => (
              <div
                key={item.id}
                className="w-full cursor-pointer shadow border-2 rounded-md transition-all ease-in duration-100 hover:border-[var(--highlight)]"
                onClick={() => selectHandler(index)}
              >
                <MusicCard name={item.name} artist={item.artist} />
              </div>
            ))}
          </div>
        </SheetDescription>
      </SheetHeader>
    </>
  );
}

export default memo(PlayerPlaylist);
