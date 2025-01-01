import { MusicCategory, MusicLanguage } from "@/types/types";
import MusicCardControl from "../module/MusicCardControl";

interface Music {
  name: string;
  artist: string;
  url: string;
  category: MusicCategory;
  language: MusicLanguage;
  like: number;
  dislike: number;
  id: string;
}

interface Musics {
  musics: Music[];
}

function LikedMusicPage({ musics }: Musics) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
        <div className="w-full flex items-center justify-center p-2 bg-secondary mb-2 rounded-md capitalize">
          <h3>favorite musics</h3>
        </div>

        {musics.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-center shadow md:w-[calc(50%-4px)]"
          >
            <MusicCardControl
              name={item.name}
              artist={item.artist}
              url={item.url}
              category={item.category}
              language={item.language}
              like={item.like ?? 0}
              dislike={item.dislike ?? 0}
              id={item.id}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default LikedMusicPage;
