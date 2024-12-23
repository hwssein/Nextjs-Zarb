import { GetMusicProps } from "@/types/types";

import HomePage from "@/components/template/HomePage";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/graphql/query";

async function Home() {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
  });

  return (
    <>
      <HomePage musics={data?.musics} />
    </>
  );
}

export default Home;
