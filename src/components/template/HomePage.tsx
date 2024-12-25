import { GetMusicProps } from "@/types/types";

import HomePageHeader from "./HomePageHeader";
import AllMusicPreview from "./AllMusicPreview";
import HeaderTextAnim2 from "../element/animation/HeaderTextAnim2";

function HomePage({ musics }: GetMusicProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2">
        <HomePageHeader />

        {musics && musics.length > 0 ? (
          <AllMusicPreview musics={musics} />
        ) : (
          <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10 capitalize">
            No music has been added yet
          </div>
        )}

        <div className="w-full flex items-center justify-center my-2">
          <HeaderTextAnim2 />
        </div>
      </div>
    </>
  );
}

export default HomePage;
