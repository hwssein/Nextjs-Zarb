"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { MusicPlayerDrawerProps, OnClickEvent } from "@/types/types";

import MusicPlayerDrawer from "./MusicPlayerDrawer";
import MusicCard from "./MusicCard";

import deleteMusic from "@/serverAction/music/deleteMusic";
import publishMusic from "@/serverAction/music/publishMusic";

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
}: MusicPlayerDrawerProps & {
  role?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteHandler = async (event: OnClickEvent) => {
    event.stopPropagation();

    const confirmDelete: boolean = confirm("Are You Sure To DELETE?");

    if (!confirmDelete) return;

    startTransition(async () => {
      const deleteRes = await deleteMusic(id, assetId ?? "false");

      if ("message" in deleteRes || deleteRes.message) {
        toast({ description: "Deleted successful" });
        router.refresh();
      }

      if ("error" in deleteRes || deleteRes.error)
        toast({
          description: "Server Error, Try Again",
          variant: "destructive",
        });
    });
  };

  const publishHandler = async (event: OnClickEvent) => {
    event.stopPropagation();

    const confirmDelete: boolean = confirm("Are You Sure To PUBLISH?");

    if (!confirmDelete) return;

    startTransition(async () => {
      const publishRes = await publishMusic(id, assetId ?? "false");

      if ("message" in publishRes || publishRes.message) {
        toast({ description: "published successful" });
        router.refresh();
      }

      if ("error" in publishRes || publishRes.error)
        toast({
          description: "Server Error, Try Again",
          variant: "destructive",
        });
    });
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className="w-full cursor-pointer">
          <div className="w-full flex flex-col items-center justify-start bg-secondary rounded pb-2">
            <div className="w-full">
              <MusicCard name={name} artist={artist} />
            </div>

            <div className="w-full flex items-center justify-end gap-2 pr-3">
              <Button
                size="sm"
                disabled={isPending}
                variant="destructive"
                className="w-16 sm:w-20"
                onClick={deleteHandler}
              >
                Delete
              </Button>

              {role === "ADMIN" && (
                <Button
                  size="sm"
                  disabled={isPending}
                  variant="default"
                  className="w-16 sm:w-20"
                  onClick={publishHandler}
                >
                  Publish
                </Button>
              )}
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="w-full flex flex-col items-center justify-center">
          <MusicPlayerDrawer
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
