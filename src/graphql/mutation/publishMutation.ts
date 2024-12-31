import { gql } from "@apollo/client";

export const Publish_User = gql`
  mutation publishItem($id: ID!) {
    publishMyUser(where: { id: $id }) {
      email
    }
  }
`;

export const Publish_User_music_Asset = gql`
  mutation publishUserMusicFile($id: ID!) {
    publishAsset(where: { id: $id }) {
      id
    }
  }
`;

export const Publish_User_music_Data = gql`
  mutation publishUserMusicData($id: ID!) {
    publishMusic(where: { id: $id }) {
      id
    }
  }
`;

export const Publish_Music_For_View = gql`
  mutation publishMusicForView($id: ID!) {
    updateMusic(data: { published: true }, where: { id: $id }) {
      id
      name
    }
  }
`;

export const Publish_User_Vote = gql`
  mutation publishUserVote($id: ID!) {
    publishUserVote(where: { id: $id }) {
      id
      voteType
    }
  }
`;
