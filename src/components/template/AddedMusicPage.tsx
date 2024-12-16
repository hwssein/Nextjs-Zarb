import { UserMusicInfoProps } from "@/types/types";
import MusicCard from "../module/MusicCard";

function AddedMusicPage({ musics }: { musics: UserMusicInfoProps }) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-1 p-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2">
        {musics.myUser.music.map((item) => (
          <div
            key={item.id}
            className="w-full bg-secondary shadow-md border-stroke rounded-md sm:w-72 lg:w-48 lg:h-48"
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
