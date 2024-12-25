"use server";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_User_Vote } from "@/graphql/query";

import findUser from "../findUser";
import createFirstVote from "./createFirstVote";
import { revalidatePath } from "next/cache";

const voteSubmit = async (
  musicId: string,
  voteType: "like" | "dislike"
): Promise<FunctionResponse> => {
  try {
    const user = await findUser();
    if ("error" in user || !user)
      throw new Error("please login to your account");

    const client = createApolloClient();

    const { data: userVote } = await client.query({
      query: Get_User_Vote,
      variables: { userId: user.id, musicId },
    });
    if (!userVote || "error" in userVote) throw new Error("server error");

    if (userVote.userVotes.length !== 0) {
      console.log("user already voted");
    } else {
      const firstVoteRes = await createFirstVote(musicId, user.id, voteType);
      if ("error" in firstVoteRes || firstVoteRes.error)
        throw new Error("server error");

      revalidatePath("/all-musics");

      return { message: "successfully voted" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }

  return { error: "an unexpected error occurred" };
};

export default voteSubmit;
