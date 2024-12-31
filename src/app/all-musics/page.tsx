import { Suspense } from "react";

import { GetMusicProps } from "@/types/types";

import AllMusicsPage from "@/components/template/AllMusicsPage";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/query/musicQuery";

import Loader from "@/components/element/animation/Loader";

async function AllMusics() {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
  });

  if ("musics" in data && data.musics.length > 0) {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <AllMusicsPage musics={data?.musics} />
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10 capitalize">
          No music has been added yet
        </div>
      </>
    );
  }
}

export default AllMusics;
