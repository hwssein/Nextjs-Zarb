"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { MusicPlayerDrawerProps, OnClickEvent } from "@/types/types";

import submitVote from "@/serverAction/vote/submitVote";
import deleteMusic from "@/serverAction/music/deleteMusic";
import VoteButtons from "../element/VoteButtons";
import MusicPlayer from "./MusicPlayer";

import { useToast } from "@/hooks/use-toast";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CircleX } from "lucide-react";

function MusicPlayerDrawer({
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
}: MusicPlayerDrawerProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const voteHandler = async (
    event: OnClickEvent,
    voteType: "like" | "dislike"
  ) => {
    event.stopPropagation();

    startTransition(async () => {
      const likeResponse = await submitVote(id, voteType);

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
        <DrawerTitle className="w-full flex flex-col items-start justify-start gap-4 capitalize mt-2">
          <span className="w-full text-left font-semibold">{name}</span>
          <span className="w-full text-left font-medium">{artist}</span>
        </DrawerTitle>

        <DrawerDescription className="w-full flex items-center justify-around gap-2 uppercase">
          <span className="text-stroke">{category}</span>
          <span className="text-stroke">{language}</span>
        </DrawerDescription>

        <MusicPlayer musicUrls={[url]} />
      </DrawerHeader>

      <DrawerFooter className="w-full  max-w-5xl">
        <VoteButtons
          isLoading={isPending}
          voteHandler={voteHandler}
          like={like}
          dislike={dislike}
        />

        <div className="w-full flex items-center justify-center gap-4">
          <DrawerClose className="w-10 text-center absolute top-2 right-2 p-2">
            <CircleX />
          </DrawerClose>

          {role === "ADMIN" && (
            <span
              onClick={deleteHandler}
              className="w-24 text-center bg-destructive text-white border border-destructive p-1 rounded-md"
            >
              Delete
            </span>
          )}
        </div>
      </DrawerFooter>
    </>
  );
}

export default MusicPlayerDrawer;
