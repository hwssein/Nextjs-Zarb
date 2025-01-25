"use client";

import { OnClickEvent } from "@/types/types";
import { Button } from "../ui/button";

import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";

interface VoteButtonsProps {
  isLoading: boolean;
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
    <div className="w-full flex items-center justify-between gap-4">
      <div className="w-3/6 flex items-center justify-center gap-2">
        <Button
          onClick={(event) => voteHandler(event, "dislike")}
          className="w-40 border border-destructive"
          variant="outline"
          disabled={isLoading}
        >
          <span className="p-1 text-foreground text-center">{dislike}</span>
          <ThumbsDown />
        </Button>
      </div>

      <div className="w-3/6 flex items-center justify-center gap-2">
        <Button
          onClick={(event) => voteHandler(event, "like")}
          className="w-40 border border-chart-2"
          variant="outline"
          disabled={isLoading}
        >
          <span className="p-1 text-foreground text-center">{like}</span>
          <ThumbsUp />
        </Button>
      </div>
    </div>
  );
}

export default VoteButtons;
