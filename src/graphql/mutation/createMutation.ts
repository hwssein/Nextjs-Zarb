import { gql } from "@apollo/client";

export const Create_User = gql`
  mutation createUser($email: String!, $password: String!, $role: String!) {
    createMyUser(data: { email: $email, password: $password, role: $role }) {
      id
    }
  }
`;

export const Create_Asset_Music_Url = gql`
  mutation createUploadMusicUrl($fileName: String!) {
    createAsset(data: { fileName: $fileName }) {
      fileName
      id
      url
      upload {
        error {
          message
        }
        expiresAt
        requestPostData {
          url
          date
          key
          signature
          algorithm
          policy
          credential
          securityToken
        }
      }
    }
  }
`;

export const Create_Music = gql`
  mutation createMusic(
    $name: String!
    $artist: String!
    $url: String!
    $category: String!
    $language: String!
    $id: ID!
    $assetId: String!
    $published: Boolean!
  ) {
    createMusic(
      data: {
        name: $name
        artist: $artist
        url: $url
        category: $category
        language: $language
        assetId: $assetId
        published: $published
        myUser: { connect: { id: $id } }
      }
    ) {
      id
    }
  }
`;

export const Create_User_Vote = gql`
  mutation createUserVote($musicId: ID!, $userId: ID!, $voteType: String!) {
    createUserVote(
      data: {
        music: { connect: { id: $musicId } }
        myUser: { connect: { id: $userId } }
        voteType: $voteType
      }
    ) {
      id
      voteType
    }
  }
`;
