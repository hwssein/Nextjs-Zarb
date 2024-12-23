import { GetMusicProps } from "@/types/types";

import AllMusicPreview from "@/template/AllMusicPreview";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/graphql/query";

async function Home() {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
  });

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2">
        <AllMusicPreview musics={data?.musics} />
      </div>
    </>
  );
}

export default Home;
