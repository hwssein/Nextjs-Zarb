import { gql } from "@apollo/client";

const Create_User = gql`
  mutation createUser($email: String!, $password: String!, $role: String!) {
    createMyUser(data: { email: $email, password: $password, role: $role }) {
      id
    }
  }
`;

const Publish_User = gql`
  mutation publishItem($id: ID!) {
    publishMyUser(where: { id: $id }) {
      email
    }
  }
`;

const Create_Music = gql`
  mutation createMusic(
    $name: String!
    $artist: String!
    $url: String!
    $category: String!
    $language: String!
    $id: ID!
  ) {
    createMusic(
      data: {
        name: $name
        artist: $artist
        url: $url
        category: $category
        language: $language
        myUser: { connect: { id: $id } }
      }
    ) {
      id
    }
  }
`;

const Create_Upload_Music_Url = gql`
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

export { Create_User, Publish_User, Create_Music, Create_Upload_Music_Url };
