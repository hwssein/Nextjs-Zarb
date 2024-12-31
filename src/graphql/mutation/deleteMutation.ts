import { gql } from "@apollo/client";

export const Delete_Music_Asset = gql`
  mutation deleteMusicAsset($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`;

export const Delete_User_Music = gql`
  mutation deleteUserMusic($id: ID!) {
    deleteMusic(where: { id: $id }) {
      name
    }
  }
`;
