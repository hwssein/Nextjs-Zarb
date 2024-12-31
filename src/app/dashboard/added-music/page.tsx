import { redirect } from "next/navigation";
import { Suspense } from "react";

import findUser from "@/serverAction/findUser";
import getUserMusic from "@/serverAction/getUserMusic";

import Loader from "@/components/element/animation/Loader";
import AddedMusicPage from "@/components/template/AddedMusicPage";

async function AddedMusic() {
  const user = await findUser();
  if ("error" in user) redirect("/login");

  const musics = await getUserMusic();

  if ("myUser" in musics) {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <AddedMusicPage musics={musics} />
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

export default AddedMusic;
