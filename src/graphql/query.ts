import { gql } from "@apollo/client";

const Find_Existing_User = gql`
  query findExistingUser($email: String!) {
    myUsers(where: { email: $email }) {
      id
      email
      role
      password
    }
  }
`;

export { Find_Existing_User };
