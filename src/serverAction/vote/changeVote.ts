"use server";

import { FunctionResponse } from "@/types/types";

const changeVote = async (
  userId: string,
  musicId: string,
  voteType: "like" | "dislike"
): Promise<FunctionResponse> => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default changeVote;
