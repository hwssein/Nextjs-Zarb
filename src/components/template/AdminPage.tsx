import { GetMusicProps } from "@/types/types";
import UserMusicCardControl from "../module/UserMusicCardControl";

function AdminPage({ musics, role }: GetMusicProps & { role: string }) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between shadow">
        <div className="w-full flex items-center justify-center p-2 bg-secondary mb-2 rounded-md capitalize">
          <h3>admin page</h3>
        </div>

        {musics.map((item) => (
          <UserMusicCardControl
            role={role}
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

export default AdminPage;
