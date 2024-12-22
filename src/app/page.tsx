import Link from "next/link";

import { GetMusicProps } from "@/types/types";

import AllMusicPreview from "@/components/module/AllMusicPreview";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/graphql/query";

import { Button } from "@/components/ui/button";

async function Home() {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
  });

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 border border-stroke rounded-md p-1">
        <AllMusicPreview musics={data?.musics} />

        <div className="w-full flex justify-end">
          <Link href="/all-musics">
            <Button variant="outline">All Musics</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
