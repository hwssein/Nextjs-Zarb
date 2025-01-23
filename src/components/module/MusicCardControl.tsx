import { MusicPlayerDrawerProps } from "@/types/types";

import MusicPlayerDrawer from "./MusicPlayerDrawer";
import MusicCard from "./MusicCard";

import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

function MusicCardControl({
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
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className="w-full cursor-pointer">
          <MusicCard name={name} artist={artist} />
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
            assetId={assetId}
            role={role}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MusicCardControl;
