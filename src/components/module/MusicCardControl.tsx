"use client";

import { useState } from "react";

import { Bool, MusicPlayerProps, OnClickType } from "@/types/types";

import submitVote from "@/serverAction/vote/submitVote";

import MusicCard from "./MusicCard";

import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
      <div className="w-full h-20 flex items-center gap-2 shadow-md md:w-[calc(50%-4px)] bg-secondary rounded pr-1">
        <div className="w-[calc(100%-32px)]">
          <MusicCard
            name={name}
            artist={artist}
            url={url}
            category={category}
            language={language}
          />
        </div>

        <Popover>
          <PopoverTrigger className="p-1">
            <EllipsisVertical />
          </PopoverTrigger>

          <PopoverContent className="w-48 p-4">
            <div className="w-full flex flex-col items-center justify-between gap-2">
              <div className="w-full flex items-center justify-between gap-2">
                <span className="w-20 py-px border-2 border-chart-2 rounded-md text-center">
                  {like}
                </span>

                <Button
                  onClick={(event) => voteHandler(event, "like")}
                  className="w-20 bg-chart-2 text-white"
                  variant="outline"
                  size="sm"
                  disabled={isLoading.like || isLoading.dislike}
                >
                  {isLoading.like ? <Loader /> : <ThumbsUp />}
                </Button>
              </div>

              <div className="w-full flex items-center justify-between gap-2">
                <span className="w-20 py-px border-2 border-destructive rounded-md text-center">
                  {dislike}
                </span>

                <Button
                  onClick={(event) => voteHandler(event, "dislike")}
                  className="w-20 bg-destructive text-white"
                  variant="outline"
                  size="sm"
                  disabled={isLoading.like || isLoading.dislike}
                >
                  {isLoading.dislike ? <Loader /> : <ThumbsDown />}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default MusicCardControl;
