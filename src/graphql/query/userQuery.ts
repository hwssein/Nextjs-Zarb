import { gql } from "@apollo/client";

export const Get_Existing_User = gql`
  query getExistingUser($email: String!) {
    myUsers(where: { email: $email }) {
      id
      email
      role
      password
      createdAt
    }
  }
`;

export const Get_User_Music = gql`
  query getUserMusic($id: ID!) {
    myUser(where: { id: $id }) {
      music(first: 100) {
        ... on Music {
          id
          name
          artist
          url
          category
          language
          like
          dislike
          assetId
        }
      }
    }
  }
`;

export const Get_User_Vote = gql`
  query getUserVote($userId: ID!, $musicId: ID!) {
    userVotes(
      where: { myUser: { id: $userId }, music: { id: $musicId } }
      first: 20000
    ) {
      id
      voteType
    }
  }
`;
