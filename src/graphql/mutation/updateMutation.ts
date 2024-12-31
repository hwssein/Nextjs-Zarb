import { gql } from "@apollo/client";

export const Update_User_Vote = gql`
  mutation updateUserVote($userVoteId: ID!, $voteType: String!) {
    updateUserVote(where: { id: $userVoteId }, data: { voteType: $voteType }) {
      id
      voteType
    }
  }
`;

export const Update_Music_Like = gql`
  mutation updateMusicLike($like: Int!, $musicId: ID!) {
    updateMusic(where: { id: $musicId }, data: { like: $like }) {
      id
      like
      name
    }
  }
`;

export const Update_Music_dislike = gql`
  mutation updateMusicDislike($dislike: Int!, $musicId: ID!) {
    updateMusic(where: { id: $musicId }, data: { dislike: $dislike }) {
      id
      dislike
      name
    }
  }
`;
