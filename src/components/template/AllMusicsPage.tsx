import { GetMusicProps } from "@/types/types";
import MusicCardControl from "../module/MusicCardControl";
import FilterSection from "../module/FilterSection";

function AllMusicsPage({ musics }: GetMusicProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
        <FilterSection />

        {musics.length !== 0 ? (
          <>
            {" "}
            <div className="w-full flex items-center justify-center p-2 bg-secondary mb-2 rounded-md capitalize">
              <h3>all musics</h3>
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
          </>
        ) : (
          <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10 capitalize">
            Unfortunately, no items were found
          </div>
        )}
      </div>
    </>
  );
}

export default AllMusicsPage;
