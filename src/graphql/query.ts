import { gql } from "@apollo/client";

const Find_Existing_User = gql`
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

export {
  Find_Existing_User,
  Get_User_Music,
  Get_Unpublished_Music,
  Get_Published_Music,
};
