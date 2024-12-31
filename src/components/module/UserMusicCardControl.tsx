"use client";

import { useRouter } from "next/navigation";

import { MusicPlayerProps, OnClickEvent } from "@/types/types";

import MusicPlayer from "./MusicPlayer";
import MusicCard from "./MusicCard";

import deleteMusic from "@/serverAction/deleteMusic";
import publishMusic from "@/serverAction/publishMusic";

import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

function UserMusicCardControl({
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
}: MusicPlayerProps & {
  assetId: string;
  role?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteHandler = async (event: OnClickEvent) => {
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

  const publishHandler = async (event: OnClickEvent) => {
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
      <Drawer>
        <DrawerTrigger asChild className="w-full cursor-pointer">
          <div className="w-full flex items-center justify-between h-16 bg-secondary rounded pr-2">
            <MusicCard name={name} artist={artist} />
            <div className="flex items-center justify-center gap-1">
              <Button
                size="sm"
                variant="outline"
                className="bg-destructive"
                onClick={deleteHandler}
              >
                Delete
              </Button>

              {role === "ADMIN" && (
                <Button size="sm" variant="outline" onClick={publishHandler}>
                  Publish
                </Button>
              )}
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="w-full flex flex-col items-center justify-center">
          <MusicPlayer
            name={name}
            artist={artist}
            url={url}
            category={category}
            language={language}
            like={like}
            dislike={dislike}
            id={id}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UserMusicCardControl;
