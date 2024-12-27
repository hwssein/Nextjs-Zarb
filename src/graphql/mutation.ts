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

const Create_Asset_Music_Url = gql`
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
const Publish_User_music_Asset = gql`
  mutation publishUserMusicFile($id: ID!) {
    publishAsset(where: { id: $id }) {
      id
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
const Publish_User_music_Data = gql`
  mutation publishUserMusicData($id: ID!) {
    publishMusic(where: { id: $id }) {
      id
    }
  }
`;

const Delete_User_Music = gql`
  mutation deleteUserMusic($id: ID!) {
    deleteMusic(where: { id: $id }) {
      name
    }
  }
`;

const Delete_Music_Asset = gql`
  mutation deleteMusicAsset($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`;

const Publish_Music_For_View = gql`
  mutation publishMusicForView($id: ID!) {
    updateMusic(data: { published: true }, where: { id: $id }) {
      id
      name
    }
  }
`;

const Create_User_Vote = gql`
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

const Update_User_Vote = gql`
  mutation updateUserVote($userVoteId: ID!, $voteType: String!) {
    updateUserVote(where: { id: $userVoteId }, data: { voteType: $voteType }) {
      id
      voteType
    }
  }
`;

const Publish_User_Vote = gql`
  mutation publishUserVote($id: ID!) {
    publishUserVote(where: { id: $id }) {
      id
      voteType
    }
  }
`;

const Update_Music_Like = gql`
  mutation updateMusicLike($like: Int!, $musicId: ID!) {
    updateMusic(where: { id: $musicId }, data: { like: $like }) {
      id
      like
      name
    }
  }
`;

const Update_Music_dislike = gql`
  mutation updateMusicDislike($dislike: Int!, $musicId: ID!) {
    updateMusic(where: { id: $musicId }, data: { dislike: $dislike }) {
      id
      dislike
      name
    }
  }
`;
export {
  Create_User,
  Publish_User,
  Publish_User_music_Asset,
  Publish_User_music_Data,
  Create_Music,
  Create_Asset_Music_Url,
  Delete_User_Music,
  Delete_Music_Asset,
  Publish_Music_For_View,
  Create_User_Vote,
  Update_User_Vote,
  Publish_User_Vote,
  Update_Music_Like,
  Update_Music_dislike,
};
