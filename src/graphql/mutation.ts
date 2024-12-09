import { gql } from "@apollo/client";

const Create_User = gql`
  mutation createUser($email: String!, $password: String!, $role: String!) {
    createMyUser(data: { email: $email, password: $password, role: $role }) {
      id
    }
  }
`;

const Publish_Item = gql`
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

export { Create_User, Publish_Item, Create_Music };
