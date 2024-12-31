import { Suspense } from "react";
import { redirect } from "next/navigation";

import { LikedMusicProps } from "@/types/types";

import getLikedMusic from "@/serverAction/getLikedMusic";
import findUser from "@/serverAction/findUser";

import LikedMusicPage from "@/components/template/LikedMusicPage";
import Loader from "@/components/element/animation/Loader";

async function LikedMusic() {
  const user = await findUser();
  if ("error" in user) redirect("/login");

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
