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

export { Create_User, Publish_Item };
