import { Suspense } from "react";

import { GetMusicProps } from "@/types/types";

import HomePage from "@/components/template/HomePage";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/query/musicQuery";

import Loader from "@/components/element/animation/Loader";

async function Home() {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
  });

  return (
    <>
      <Suspense fallback={<Loader />}>
        <HomePage musics={data?.musics} />
      </Suspense>
    </>
  );
}

export default Home;
