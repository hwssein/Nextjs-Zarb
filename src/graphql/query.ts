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
        }
      }
    }
  }
`;

export { Find_Existing_User, Get_User_Music };
