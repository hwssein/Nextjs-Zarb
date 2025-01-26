import { gql } from "@apollo/client";

export const Get_Unpublished_Music = gql`
  query getUnpublishedMusic {
    musics(where: { published: false }, first: 50) {
      id
      name
      artist
      category
      language
      url
      assetId
      like
      dislike
    }
  }
`;

export const Get_Published_Music = gql`
  query getPublishedMusic {
    musics(where: { published: true }, first: 100) {
      id
      name
      artist
      category
      language
      url
      createdAt
      like
      dislike
      assetId
    }
  }
`;

export const Get_Music_Vote = gql`
  query getMusicVote($id: ID!) {
    music(where: { id: $id }) {
      id
      like
      dislike
    }
  }
`;

export const Get_Liked_Music = gql`
  query getLikedMusic($userId: ID!) {
    userVotes(
      where: { myUser: { id: $userId }, voteType: "like" }
      first: 20000
    ) {
      music {
        name
        artist
        url
        category
        language
        like
        dislike
        id
      }
    }
  }
`;
