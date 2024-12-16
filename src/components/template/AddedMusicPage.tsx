import { UserMusicInfoProps } from "@/types/types";
import UserMusicCardControl from "../module/UserMusicCardControl";

function AddedMusicPage({ musics }: { musics: UserMusicInfoProps }) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
        {musics.myUser.music.map((item) => (
          <UserMusicCardControl
            key={item.id}
            name={item.name}
            artist={item.artist}
            url={item.url}
            category={item.category}
            language={item.language}
            id={item.id}
            assetId={item.assetId}
          />
        ))}
      </div>
    </>
  );
}

export default AddedMusicPage;
