import { redirect } from "next/navigation";
import { Suspense } from "react";

import getUserMusic from "@/serverAction/music/getUserMusic";
import sessionRequest from "@/config/sessionRequest";

import Loader from "@/components/element/animation/Loader";
import MyMusicPage from "@/components/template/MyMusicPage";

async function MyMusic() {
  const user = await sessionRequest();

  if (user.error) redirect("/login");

  const musics = await getUserMusic();

  if ("myUser" in musics) {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <MyMusicPage musics={musics} />
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

export default MyMusic;
