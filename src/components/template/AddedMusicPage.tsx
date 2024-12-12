import { UserMusicInfoProps } from "@/types/types";
import MusicCard from "../module/MusicCard";

function AddedMusicPage({ musics }: { musics: UserMusicInfoProps }) {
  console.log(musics);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2">
        {musics.myUser.music.map((item) => (
          <div key={item.id}>
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
