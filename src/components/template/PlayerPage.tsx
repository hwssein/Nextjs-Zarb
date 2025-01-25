"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useTransition } from "react";

import { GetMusicProps, Music, OnClickEvent } from "@/types/types";

import submitVote from "@/serverAction/vote/submitVote";
import VoteButtons from "../element/VoteButtons";

import { useToast } from "@/hooks/use-toast";

const MusicPlayer = dynamic(() => import("../module/MusicPlayer"), {
  ssr: false,
});

function PlayerPage({ musics }: GetMusicProps) {
  const [playlist] = useState<Array<Music>>(musics);
  const [currentMusic, setCurrentMusic] = useState<number>(0);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const nextHandler = () => {
    const newIndex = (currentMusic + 1) % playlist.length;
    setCurrentMusic(newIndex);
  };

  const prevHandler = () => {
    const newIndex = (currentMusic - 1 + playlist.length) % playlist.length;
    setCurrentMusic(newIndex);
  };

  const voteHandler = async (
    event: OnClickEvent,
    voteType: "like" | "dislike"
  ) => {
    event.stopPropagation();

    startTransition(async () => {
      const likeResponse = await submitVote(
        playlist[currentMusic]?.id,
        voteType
      );

      if ("error" in likeResponse || likeResponse.error) {
        toast({
          description: likeResponse.error,
          variant: "destructive",
        });

        return;
      }

      if ("message" in likeResponse || likeResponse.message) {
        toast({
          description: likeResponse.message,
        });
      }
    });
  };

  return (
    <>
      <div className="w-full h-[calc(100vh-210px)] rounded-md flex flex-col items-center justify-between gap-2">
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-4">
          <div className="w-full flex flex-col items-center justify-start gap-2 capitalize text-xl">
            <span className="font-medium">{playlist[currentMusic]?.name}</span>
            <span className="font-normal">
              {playlist[currentMusic]?.artist}
            </span>
          </div>

          <Image
            src="/images/music-player-cover.png"
            alt="player-cover"
            width={300}
            height={300}
            className="rounded-md"
          />
        </div>

        <div className="w-full px-4 mb-4 flex flex-col items-center justify-start gap-12">
          <VoteButtons
            isLoading={isPending}
            voteHandler={voteHandler}
            like={playlist[currentMusic]?.like}
            dislike={playlist[currentMusic]?.dislike}
          />

          <MusicPlayer
            musicUrl={playlist[currentMusic].url}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
          />
        </div>
      </div>
    </>
  );
}

export default PlayerPage;
