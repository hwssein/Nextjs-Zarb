"use client";

import { OnClickEvent } from "@/types/types";
import { Button } from "../ui/button";

import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { Loader } from "lucide-react";

interface VoteButtonsProps {
  isLoading: { like: boolean; dislike: boolean };
  voteHandler: (event: OnClickEvent, voteType: "like" | "dislike") => void;
  like: number;
  dislike: number;
}

function VoteButtons({
  isLoading,
  voteHandler,
  like,
  dislike,
}: VoteButtonsProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4 mb-4 md:gap-14">
      <div className="w-3/6 flex items-center justify-center gap-2">
        <Button
          onClick={(event) => voteHandler(event, "dislike")}
          className="w-full bg-destructive text-white"
          variant="outline"
          disabled={isLoading.like || isLoading.dislike}
        >
          {isLoading.dislike ? (
            <Loader />
          ) : (
            <>
              <span className="py-1 px-3 text-foreground bg-background border-2 border-destructive rounded-md text-center">
                {dislike}
              </span>
              <ThumbsDown />
            </>
          )}
        </Button>
      </div>

      <div className="w-3/6 flex items-center justify-center gap-2">
        <Button
          onClick={(event) => voteHandler(event, "like")}
          className="w-full bg-chart-2 text-white"
          variant="outline"
          disabled={isLoading.like || isLoading.dislike}
        >
          {isLoading.like ? (
            <Loader />
          ) : (
            <>
              <span className="py-1 px-3 text-foreground bg-background border-2 border-chart-2 rounded-md text-center">
                {like}
              </span>
              <ThumbsUp />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default VoteButtons;
