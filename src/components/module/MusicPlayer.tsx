"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { MusicPlayerProps, OnClickEvent } from "@/types/types";

import submitVote from "@/serverAction/vote/submitVote";
import deleteMusic from "@/serverAction/music/deleteMusic";
import VoteButtons from "../element/VoteButtons";

import ReactPlayer from "react-player";

import { useToast } from "@/hooks/use-toast";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

function MusicPlayer({
  name,
  artist,
  url,
  category,
  language,
  like,
  dislike,
  id,
  assetId,
  role,
}: MusicPlayerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<{
    like: boolean;
    dislike: boolean;
  }>({
    like: false,
    dislike: false,
  });

  const voteHandler = async (
    event: OnClickEvent,
    voteType: "like" | "dislike"
  ) => {
    event.stopPropagation();

    setIsLoading((prevValue) => ({ ...prevValue, [voteType]: true }));

    const likeResponse = await submitVote(id, voteType);

    setIsLoading((prevValue) => ({ ...prevValue, [voteType]: false }));

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
  };

  const deleteHandler = async (event: OnClickEvent) => {
    event.stopPropagation();

    const confirmDelete: boolean = confirm("Are You Sure To DELETE?");

    if (!confirmDelete) return;

    const deleteRes = await deleteMusic(id, assetId ?? "false");

    if ("message" in deleteRes || deleteRes.message) {
      toast({ description: "Deleted successful" });
      router.refresh();
    }

    if ("error" in deleteRes || deleteRes.error)
      toast({ description: "Server Error, Try Again", variant: "destructive" });
  };

  return (
    <>
      <DrawerHeader className="w-full max-w-5xl flex flex-col items-start justify-start gap-4">
        <DrawerTitle className="w-full flex flex-col items-start justify-start gap-4 capitalize">
          <span className="w-full text-left font-bold">{name}</span>
          <span className="w-full text-left">{artist}</span>
        </DrawerTitle>

        <DrawerDescription className="w-full flex items-center justify-around gap-2 capitalize">
          <span>{category}</span>
          <span>{language}</span>
        </DrawerDescription>

        <ReactPlayer
          url={url}
          controls={true}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
              },
              forceAudio: true,
            },
            youtube: {
              playerVars: { showinfo: 0, modestbranding: 1 },
            },
            soundcloud: {
              options: { show_artwork: false, hide_related: true },
            },
          }}
          width="100%"
          height="85px"
        />
      </DrawerHeader>

      <DrawerFooter className="w-full  max-w-5xl">
        <VoteButtons
          isLoading={isLoading}
          voteHandler={voteHandler}
          like={like}
          dislike={dislike}
        />

        <DrawerClose className="w-full flex items-center justify-center gap-4">
          <span className="w-28 bg-background border border-stroke p-1 rounded-md transition-all ease-in duration-100 hover:bg-secondary">
            Close
          </span>

          {role === "ADMIN" && (
            <span
              onClick={deleteHandler}
              className="w-28 bg-destructive text-white border border-destructive p-1 rounded-md transition-all ease-in duration-100 hover:bg-secondary hover:text-foreground"
            >
              Delete
            </span>
          )}
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}

export default MusicPlayer;
