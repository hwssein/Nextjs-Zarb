import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { LikedMusicProps } from "@/types/types";

import getLikedMusic from "@/serverAction/music/getLikedMusic";

import LikedMusicPage from "@/components/template/LikedMusicPage";
import Loader from "@/components/element/animation/Loader";

async function LikedMusic() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/auth/find-user`, {
    method: "POST",
    body: JSON.stringify({ token: token || "" }),
    headers: { "Content-Type": "application/json" },
    cache: "reload",
  });
  const user = await res.json();

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
