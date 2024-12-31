"use server";

import { FunctionResponse, LikedMusicProps } from "@/types/types";

import findUser from "./findUser";

import createApolloClient from "@/config/apolloClient";
import { Get_Liked_Music } from "@/query/musicQuery";

const getLikedMusic = async (): Promise<FunctionResponse | LikedMusicProps> => {
  try {
    const user = await findUser();
    if ("error" in user) throw new Error("please login to your account");

    const client = createApolloClient();

    const { data } = await client.query<LikedMusicProps>({
      query: Get_Liked_Music,
      variables: { userId: user.id },
    });
    if (data?.userVotes.length === 0) return { message: "no items found" };
    if (!data || "error" in data) throw new Error("server error");

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default getLikedMusic;
