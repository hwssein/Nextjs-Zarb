import { UserMusicInfoProps } from "@/types/types";
import MusicCard from "../module/MusicCard";

function AddedMusicPage({ musics }: { musics: UserMusicInfoProps }) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
        {musics.myUser.music.map((item) => (
          <div
            key={item.id}
            className="w-full h-20 shadow-md md:w-[calc(50%-4px)]"
          >
            <MusicCard
              name={item.name}
              artist={item.artist}
              url={item.url}
              category={item.category}
              language={item.language}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default AddedMusicPage;
