import { UserMusicInfo } from "@/types/types";
import UserMusicCardControl from "../module/UserMusicCardControl";

function AddedMusicPage({ musics }: { musics: UserMusicInfo }) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between shadow">
        {musics.myUser.music.map((item) => (
          <UserMusicCardControl
            key={item.id}
            name={item.name}
            artist={item.artist}
            url={item.url}
            category={item.category}
            language={item.language}
            like={item.like ?? 0}
            dislike={item.dislike ?? 0}
            id={item.id}
            assetId={item.assetId ?? "false"}
          />
        ))}
      </div>
    </>
  );
}

export default AddedMusicPage;
