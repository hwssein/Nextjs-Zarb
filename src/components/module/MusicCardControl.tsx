"use client";

import { MusicPlayerProps, OnClickType } from "@/types/types";

import MusicCard from "./MusicCard";

import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";

function MusicCardControl({
  name,
  artist,
  url,
  category,
  language,
  like,
  dislike,
  id,
}: MusicPlayerProps & { id: string; like: number; dislike: number }) {
  const likeHandler = (event: OnClickType) => {
    event.stopPropagation();
  };

  const disLikeHandler = (event: OnClickType) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="w-full h-20 flex items-center shadow-md md:w-[calc(50%-4px)] bg-secondary rounded pr-1">
        <MusicCard
          name={name}
          artist={artist}
          url={url}
          category={category}
          language={language}
        />

        <div className="flex flex-col justify-center items-center gap-2">
          <Button
            onClick={likeHandler}
            className="w-14 bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700 text-white"
            variant="outline"
            size="sm"
          >
            <ThumbsUp />
          </Button>

          <Button
            onClick={disLikeHandler}
            className="w-14  bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-white"
            variant="outline"
            size="sm"
          >
            <ThumbsDown />
          </Button>
        </div>
      </div>
    </>
  );
}

export default MusicCardControl;
