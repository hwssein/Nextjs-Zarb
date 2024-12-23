import { GetMusicProps } from "@/types/types";

import HomePageHeader from "./HomePageHeader";
import AllMusicPreview from "./AllMusicPreview";
import HeaderTextAnim2 from "../element/animation/HeaderTextAnim2";

function HomePage({ musics }: GetMusicProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2">
        <HomePageHeader />

        <AllMusicPreview musics={musics} />

        <div className="w-full flex items-center justify-center my-2">
          <HeaderTextAnim2 />
        </div>
      </div>
    </>
  );
}

export default HomePage;
