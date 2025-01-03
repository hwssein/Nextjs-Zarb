import { GetMusicProps } from "@/types/types";
import MusicCardControl from "../module/MusicCardControl";

function TopMusics({ musics }: GetMusicProps) {
  const sortedMusics = [...musics].sort(
    (a, b) => (b.like ?? 0) - (a.like ?? 0)
  );

  const selectedMusics = sortedMusics.slice(0, 5);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 p-2 border border-stroke rounded-md">
        <div className="w-full flex items-start">
          <h2 className="capitalize font-semibold text-lg tracking-wider border-b-2 border-primary mb-2">
            Top 5 musics
          </h2>
        </div>

        <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
          {selectedMusics.map((item) => (
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

          <div className="hidden h-16 rounded shadow items-center justify-center bg-secondary text-xl font-semibold md:flex md:w-[calc(50%-4px)]">
            Love it?
          </div>
        </div>
      </div>
    </>
  );
}

export default TopMusics;
