import Link from "next/link";

import { GetMusicProps } from "@/types/types";

import AllMusicPreview from "./AllMusicPreview";
import TopMusics from "./TopMusics";

import HomePageHeader from "./HomePageHeader";
import HeaderTextAnim2 from "../element/animation/HeaderTextAnim2";
import { BicepsFlexed } from "lucide-react";

function HomePage({ musics }: GetMusicProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2">
        <HomePageHeader />

        <Link replace={true} href="/player" className="w-full mt-1 mb-3">
          <div className="w-full bg-[var(--highlight)] py-4 rounded-md">
            <span className="w-full text-black font-semibold uppercase animate-uploadText flex items-center justify-center gap-1 text-center">
              play <BicepsFlexed />
            </span>
          </div>
        </Link>

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

        {musics && musics.length > 0 ? (
          <TopMusics musics={musics} />
        ) : (
          <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10 capitalize">
            No music has been added yet
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
