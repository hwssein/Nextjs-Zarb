"use server";

import { FunctionResponse, UserMusicInfo } from "@/types/types";

import findUser from "../auth/findUser";

import createApolloClient from "@/config/apolloClient";
import { Get_User_Music } from "@/query/userQuery";

const getUserMusic = async (): Promise<FunctionResponse | UserMusicInfo> => {
  try {
    const user = await findUser();
    if ("error" in user) throw new Error("please login to your account");

    const client = createApolloClient();

    const { data: getUserMusicArray } = await client.query<UserMusicInfo>({
      query: Get_User_Music,
      variables: { id: user.id },
    });

    if (!getUserMusicArray || "error" in getUserMusicArray)
      throw new Error("server error");
    if (getUserMusicArray.myUser.music.length === 0)
      return { message: "no items found" };

    return getUserMusicArray;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred " };
};

export default getUserMusic;
