import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { LikedMusicProps } from "@/types/types";

import getLikedMusic from "@/serverAction/music/getLikedMusic";
import sessionRequest from "@/config/sessionRequest";

import LikedMusicPage from "@/components/template/LikedMusicPage";
import Loader from "@/components/element/animation/Loader";

export const metadata: Metadata = {
  title: "ZARB | liked Musics",
};

async function LikedMusic() {
  const user = await sessionRequest();

  if (user.error) redirect("/login");

  const data = await getLikedMusic();

  if ("userVotes" in data) {
    const likedMusics: LikedMusicProps = data;
    const musics = likedMusics.userVotes.map((item) => item.music);
    return (
      <>
        <Suspense fallback={<Loader />}>
          <LikedMusicPage musics={musics} />
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10">
          No Items Found
        </div>
      </>
    );
  }
}

export default LikedMusic;
