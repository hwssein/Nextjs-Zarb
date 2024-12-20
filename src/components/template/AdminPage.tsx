import { MusicCategory, MusicLanguage } from "@/types/types";
import UserMusicCardControl from "../module/UserMusicCardControl";

interface Music {
  musics: [
    {
      id: string;
      name: string;
      artist: string;
      url: string;
      category: MusicCategory;
      language: MusicLanguage;
      assetId: string;
    }
  ];
}

function AdminPage({ musics, role }: Music & { role: string }) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
        {musics.map((item) => (
          <UserMusicCardControl
            role={role}
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

export default AdminPage;
