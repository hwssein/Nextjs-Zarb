"use server";

import { revalidatePath } from "next/cache";

import { FunctionResponse } from "@/types/types";

import sessionRequest from "@/config/sessionRequest";

import changeVote from "./changeVote";
import createFirstVote from "./createFirstVote";
import createApolloClient from "@/config/apolloClient";
import { Get_User_Vote } from "@/query/userQuery";

const submitVote = async (
  musicId: string,
  voteType: "like" | "dislike"
): Promise<FunctionResponse> => {
  try {
    const user = await sessionRequest();

    if (user.error || !user) throw new Error("please login to your account");

    const client = createApolloClient();

    const { data: userVote } = await client.query({
      query: Get_User_Vote,
      variables: { userId: user.id, musicId },
    });
    if (!userVote || "error" in userVote) throw new Error("server error");

    if (userVote?.userVotes[0]?.voteType === voteType) {
      return {
        error: `you already voted to ${userVote.userVotes[0].voteType}`,
      };
    }

    if (userVote.userVotes.length !== 0) {
      const changeVoteRes = await changeVote(
        musicId,
        userVote.userVotes[0].id,
        voteType
      );
      if ("error" in changeVoteRes || changeVoteRes.error) {
        console.log(changeVoteRes.error);
        throw new Error("server error");
      }

      revalidatePath("/");
      revalidatePath("/all-musics");
      revalidatePath("/player");

      return { message: "submit new vote" };
    } else {
      const firstVoteRes = await createFirstVote(musicId, user.id, voteType);
      if ("error" in firstVoteRes || firstVoteRes.error) {
        console.log(firstVoteRes.error);
        throw new Error("server error");
      }

      revalidatePath("/");
      revalidatePath("/all-musics");
      revalidatePath("/player");

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

export default submitVote;
