import { GetMusicProps } from "@/types/types";
import MusicCardControl from "../module/MusicCardControl";

function AllMusicsPage({ musics }: GetMusicProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
        {musics.map((item) => (
          <MusicCardControl
            key={item.id}
            name={item.name}
            artist={item.artist}
            url={item.url}
            category={item.category}
            language={item.language}
            like={item.like ?? 0}
            dislike={item.dislike ?? 0}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
}

export default AllMusicsPage;
