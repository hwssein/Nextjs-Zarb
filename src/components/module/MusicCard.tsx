import { MusicCategory, MusicLanguage } from "@/types/types";
import Image from "next/image";

interface musicProps {
  name: string;
  artist: string;
  url: string;
  category: MusicCategory;
  language: MusicLanguage;
}
function MusicCard({ name, artist, url, category, language }: musicProps) {
  return (
    <>
      <div className="w-full p-2 flex items-center justify-center gap-1 cursor-pointer lg:flex-col lg:items-center lg:justify-start">
        <Image
          src="/images/music-card.png"
          width={200}
          height={200}
          alt="card cover"
          className="w-2/12 rounded-md mr-2 lg:w-20 lg:mr-0 lg:mb-2"
        ></Image>

        <div className="w-full flex flex-col items-start justify-start gap-1">
          <span className="w-full lg:text-center">{name}</span>
          <span className="w-full lg:text-center">{artist}</span>
        </div>
      </div>
    </>
  );
}

export default MusicCard;
