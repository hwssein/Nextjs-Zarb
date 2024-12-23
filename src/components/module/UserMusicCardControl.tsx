"use client";

import { useRouter } from "next/navigation";

import { MusicPlayerProps, OnClickType } from "@/types/types";

import deleteMusic from "@/serverAction/deleteMusic";
import publishMusic from "@/serverAction/publishMusic";

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
  role,
}: MusicPlayerProps & {
  id: string;
  assetId: string;
  role?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteHandler = async (event: OnClickType) => {
    event.stopPropagation();
    const confirmDelete: boolean = confirm("Are You Sure To DELETE?");

    if (!confirmDelete) return;

    const deleteRes = await deleteMusic(id, assetId);

    if ("message" in deleteRes || deleteRes.message) {
      toast({ description: "Deleted successful" });
      router.refresh();
    }

    if ("error" in deleteRes || deleteRes.error)
      toast({ description: "Server Error, Try Again", variant: "destructive" });
  };

  const publishHandler = async (event: OnClickType) => {
    event.stopPropagation();

    const confirmDelete: boolean = confirm("Are You Sure To PUBLISH?");

    if (!confirmDelete) return;

    const publishRes = await publishMusic(id);

    if ("message" in publishRes || publishRes.message) {
      toast({ description: "published successful" });
      router.refresh();
    }

    if ("error" in publishRes || publishRes.error)
      toast({ description: "Server Error, Try Again", variant: "destructive" });
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

        <div className="flex flex-col items-center justify-center gap-1">
          <Button size="sm" variant="outline" onClick={deleteHandler}>
            Delete
          </Button>

          {role === "ADMIN" && (
            <Button size="sm" variant="outline" onClick={publishHandler}>
              Publish
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default UserMusicCardControl;
