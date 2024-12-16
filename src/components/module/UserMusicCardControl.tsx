"use client";

import { useRouter } from "next/navigation";

import { musicPlayerProps, OnClickType } from "@/types/types";

import deleteMusic from "@/serverAction/deleteMusic";

import MusicCard from "./MusicCard";

import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

function UserMusicCardControl({
  name,
  artist,
  url,
  category,
  language,
  id,
  assetId,
}: musicPlayerProps & { id: string; assetId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteHandler = async (event: OnClickType) => {
    event.stopPropagation();
    const confirmDelete: boolean = confirm("Are You Sure?");

    if (!confirmDelete) return;

    const deleteRes = await deleteMusic(id, assetId);

    if ("message" in deleteRes) {
      toast({ description: "Deleted successful" });
      router.refresh();
    }

    if ("error" in deleteRes)
      toast({ description: "Server Error, Try Again", variant: "destructive" });
  };

  return (
    <>
      <div className="w-full h-20 flex items-center shadow-md md:w-[calc(50%-4px)] bg-secondary rounded-md pr-1">
        <MusicCard
          name={name}
          artist={artist}
          url={url}
          category={category}
          language={language}
        />

        <Button size="sm" variant="outline" onClick={deleteHandler}>
          Delete
        </Button>
      </div>
    </>
  );
}

export default UserMusicCardControl;
