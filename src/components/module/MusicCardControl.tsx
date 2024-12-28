import { MusicPlayerProps } from "@/types/types";

import MusicPlayer from "../element/MusicPlayer";
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
}: MusicPlayerProps) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className="w-full cursor-pointer">
          <MusicCard name={name} artist={artist} />
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

export default MusicCardControl;
