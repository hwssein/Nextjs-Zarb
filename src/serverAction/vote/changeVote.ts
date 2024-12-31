"use server";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Music_Vote } from "@/query/musicQuery";
import {
  Update_Music_dislike,
  Update_Music_Like,
  Update_User_Vote,
} from "@/mutation/updateMutation";
import {
  Publish_User_music_Data,
  Publish_User_Vote,
} from "@/mutation/publishMutation";

const changeVote = async (
  musicId: string,
  userVoteId: string,
  newVote: "like" | "dislike"
): Promise<FunctionResponse> => {
  try {
    const client = createApolloClient();

    const { data: updateUserVote } = await client.mutate({
      mutation: Update_User_Vote,
      variables: { userVoteId, voteType: newVote },
    });
    if (!updateUserVote || !updateUserVote.updateUserVote)
      throw new Error("Failed to update user vote");

    const { data: publishUserVote } = await client.mutate({
      mutation: Publish_User_Vote,
      variables: { id: userVoteId },
    });
    if (!publishUserVote || !publishUserVote.publishUserVote)
      throw new Error("Failed to publish user vote");

    const { data: musicVote } = await client.query({
      query: Get_Music_Vote,
      variables: { id: musicId },
    });
    if (!musicVote || !musicVote.music)
      throw new Error("Failed to fetch music vote data");

    const likeCount = musicVote.music.like;
    const dislikeCount = musicVote.music.dislike;

    if (newVote === "like") {
      const decreaseDislike = dislikeCount === 0 ? 0 : dislikeCount - 1;
      const increaseLike = likeCount + 1;

      const { data: updateDislike } = await client.mutate({
        mutation: Update_Music_dislike,
        variables: { dislike: decreaseDislike, musicId },
      });
      if (!updateDislike || !updateDislike.updateMusic)
        throw new Error("Failed to update music dislike");

      const { data: updateLike } = await client.mutate({
        mutation: Update_Music_Like,
        variables: { like: increaseLike, musicId },
      });
      if (!updateLike || !updateLike.updateMusic)
        throw new Error("Failed to update music like");

      const { data: publishMusicData } = await client.mutate({
        mutation: Publish_User_music_Data,
        variables: { id: musicId },
      });
      if (!publishMusicData || !publishMusicData.publishMusic)
        throw new Error("Failed to publish music data");

      return { message: "successful" };
    } else if (newVote === "dislike") {
      const decreaseLike = likeCount === 0 ? 0 : likeCount - 1;
      const increaseDisLike = dislikeCount + 1;

      const { data: updateLike } = await client.mutate({
        mutation: Update_Music_Like,
        variables: { like: decreaseLike, musicId },
      });
      if (!updateLike || !updateLike.updateMusic)
        throw new Error("Failed to update music like");

      const { data: updateDislike } = await client.mutate({
        mutation: Update_Music_dislike,
        variables: { dislike: increaseDisLike, musicId },
      });
      if (!updateDislike || !updateDislike.updateMusic)
        throw new Error("Failed to update music dislike");

      const { data: publishMusicData } = await client.mutate({
        mutation: Publish_User_music_Data,
        variables: { id: musicId },
      });
      if (!publishMusicData || !publishMusicData.publishMusic)
        throw new Error("Failed to publish music data");

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

export default changeVote;
