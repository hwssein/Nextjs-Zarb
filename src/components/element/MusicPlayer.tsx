"use client";

import { useState } from "react";

import { MusicPlayerProps, OnClickType, Bool } from "@/types/types";

import submitVote from "@/serverAction/vote/submitVote";
import VoteButtons from "./VoteButtons";

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
}: MusicPlayerProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<{ like: Bool; dislike: Bool }>({
    like: false,
    dislike: false,
  });

  const voteHandler = async (
    event: OnClickType,
    voteType: "like" | "dislike"
  ) => {
    event.stopPropagation();

    if (voteType === "like") {
      setIsLoading((prevValue) => ({ ...prevValue, like: true }));
    }
    if (voteType === "dislike") {
      setIsLoading((prevValue) => ({ ...prevValue, dislike: true }));
    }

    const likeResponse = await submitVote(id, voteType);

    if (voteType === "like") {
      setIsLoading((prevValue) => ({ ...prevValue, like: false }));
    }
    if (voteType === "dislike") {
      setIsLoading((prevValue) => ({ ...prevValue, dislike: false }));
    }

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

  return (
    <>
      <DrawerHeader className="w-full max-w-5xl flex flex-col items-start justify-start gap-6">
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
          }}
          width="100%"
          height="50px"
        />
      </DrawerHeader>

      <DrawerFooter className="w-full  max-w-5xl">
        <VoteButtons
          isLoading={isLoading}
          voteHandler={voteHandler}
          like={like}
          dislike={dislike}
        />

        <DrawerClose className="w-full flex items-center justify-center">
          <span className="w-28 bg-background border border-stroke p-1 rounded-md transition-all ease-in duration-100 hover:bg-secondary">
            Stop
          </span>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}

export default MusicPlayer;
