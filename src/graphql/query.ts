import { gql } from "@apollo/client";

const Get_Existing_User = gql`
  query findExistingUser($email: String!) {
    myUsers(where: { email: $email }) {
      id
      email
      role
      password
      createdAt
    }
  }
`;

const Get_User_Music = gql`
  query getUserMusic($id: ID!) {
    myUser(where: { id: $id }) {
      music {
        ... on Music {
          id
          name
          artist
          url
          category
          language
          assetId
        }
      }
    }
  }
`;

const Get_Unpublished_Music = gql`
  query getUnpublishedMusic {
    musics(where: { published: false }) {
      id
      name
      artist
      category
      language
      url
      assetId
    }
  }
`;

const Get_Published_Music = gql`
  query getUnpublishedMusic {
    musics(where: { published: true }) {
      id
      name
      artist
      category
      language
      url
      createdAt
      like
      dislike
    }
  }
`;

const Get_User_Vote = gql`
  query getUserVote($userId: ID!, $musicId: ID!) {
    userVotes(where: { myUser: { id: $userId }, music: { id: $musicId } }) {
      id
      voteType
    }
  }
`;

const Get_Music_Vote = gql`
  query getMusicVote($id: ID!) {
    music(where: { id: $id }) {
      id
      like
      dislike
    }
  }
`;

export {
  Get_Existing_User,
  Get_User_Music,
  Get_Unpublished_Music,
  Get_Published_Music,
  Get_User_Vote,
  Get_Music_Vote,
};
