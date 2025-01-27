"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

import { GetMusicProps, OnClickEvent } from "@/types/types";

import submitVote from "@/serverAction/vote/submitVote";
import VoteButtons from "../element/VoteButtons";
import PlayerPlaylist from "./PlayerPlaylist";

import { useToast } from "@/hooks/use-toast";
import { MoveLeft } from "lucide-react";
import { ListMusic } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";

const MusicPlayer = dynamic(() => import("@/module/MusicPlayer"), {
  ssr: false,
});
const ToggleTheme = dynamic(() => import("@/element/ThemeToggle"), {
  ssr: false,
});

function PlayerPage({ musics }: GetMusicProps) {
  const playlist = useMemo(() => musics, [musics]);
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

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
      <div className="w-full h-[calc(100vh-8px)] bg-[url(/images/player-background-light.jpg)] dark:bg-[url(/images/player-background-dark.jpg)] bg-cover bg-center rounded-md overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-between gap-4 backdrop-blur-sm">
          <div className="w-full flex flex-col items-center justify-start gap-2">
            <div className="w-full flex items-center justify-between gap-4 px-2">
              <Link href="/" className="p-1">
                <MoveLeft />
              </Link>

              <span className="p-1">
                <ToggleTheme />
              </span>

              <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                <SheetTrigger className="p-1 cursor-pointer">
                  <ListMusic />
                </SheetTrigger>

                <SheetContent className="overflow-y-auto">
                  <PlayerPlaylist
                    musics={musics}
                    setCurrentMusic={setCurrentMusic}
                    setIsOpenSheet={setIsOpenSheet}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="w-full flex flex-col items-center justify-start gap-2 capitalize text-xl mb-3">
              <span className="font-medium">
                {playlist[currentMusic]?.name}
              </span>

              <span className="font-normal">
                {playlist[currentMusic]?.artist}
              </span>
            </div>

            <Image
              src="/images/player-cover.jpg"
              alt="player-cover"
              width={250}
              height={250}
              priority={true}
              className="rounded-md mb-3 w-52 h-52 sm:w-64 sm:h-64"
            />

            <div className="font-normal flex items-center justify-center gap-5 uppercase text-base text-stroke">
              <span>{playlist[currentMusic]?.category}</span>
              <span>{playlist[currentMusic]?.language}</span>
            </div>
          </div>

          <div className="w-full px-4 mb-8 flex flex-col items-center justify-start gap-12">
            <VoteButtons
              isLoading={isPending}
              voteHandler={voteHandler}
              like={playlist[currentMusic]?.like ?? 0}
              dislike={playlist[currentMusic]?.dislike ?? 0}
            />

            <MusicPlayer
              musicUrl={playlist[currentMusic]?.url}
              nextHandler={nextHandler}
              prevHandler={prevHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerPage;
