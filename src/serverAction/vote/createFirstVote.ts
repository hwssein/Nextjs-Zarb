"use server";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Music_Vote } from "@/query/musicQuery";
import { Create_User_Vote } from "@/mutation/createMutation";
import {
  Publish_User_music_Data,
  Publish_User_Vote,
} from "@/mutation/publishMutation";
import {
  Update_Music_dislike,
  Update_Music_Like,
} from "@/mutation/updateMutation";

const createFirstVote = async (
  musicId: string,
  userId: string,
  voteType: "like" | "dislike"
): Promise<FunctionResponse> => {
  try {
    const client = createApolloClient();

    const { data: createVote } = await client.mutate({
      mutation: Create_User_Vote,
      variables: { musicId, userId, voteType },
    });
    if (!createVote || "error" in createVote) throw new Error("server error");

    const { data: publishUserVote } = await client.mutate({
      mutation: Publish_User_Vote,
      variables: { id: createVote.createUserVote.id },
    });
    if (!publishUserVote || "error" in publishUserVote)
      throw new Error("server error");

    const { data: musicVote } = await client.query({
      query: Get_Music_Vote,
      variables: { id: musicId },
    });
    if (!musicVote || "error" in musicVote) throw new Error("server error");

    const likeCount = musicVote.music.like;
    const dislikeCount = musicVote.music.dislike;

    if (voteType === "like") {
      const newLikeCount = likeCount + 1;

      const { data: updateLike } = await client.mutate({
        mutation: Update_Music_Like,
        variables: { like: newLikeCount, musicId },
      });
      if (!updateLike || "error" in updateLike) throw new Error("server error");

      const { data: publishMusicData } = await client.mutate({
        mutation: Publish_User_music_Data,
        variables: { id: musicId },
      });
      if (!publishMusicData || "error" in publishMusicData)
        throw new Error("server error");

      return { message: "successful" };
    } else if (voteType === "dislike") {
      const newDislikeCount = dislikeCount + 1;

      const { data: updateDislike } = await client.mutate({
        mutation: Update_Music_dislike,
        variables: { dislike: newDislikeCount, musicId },
      });
      if (!updateDislike || "error" in updateDislike)
        throw new Error("server error");

      const { data: publishMusicData } = await client.mutate({
        mutation: Publish_User_music_Data,
        variables: { id: musicId },
      });
      if (!publishMusicData || "error" in publishMusicData)
        throw new Error("server error");

      return { message: "successful" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default createFirstVote;
