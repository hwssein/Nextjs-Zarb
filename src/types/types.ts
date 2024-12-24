export type Children = Readonly<{ children: React.ReactNode }>;
export type Bool = boolean;
export type OnChangeType = React.ChangeEvent<HTMLInputElement>;
export type OnClickType = React.MouseEvent<HTMLButtonElement>;

export type MusicCategory = "remix" | "electronic" | "hip-hop" | "house";
export type MusicLanguage = "persian" | "english" | "turkish" | "other";

export interface LoginFormType {
  email: string;
  password: string;
}
export interface FunctionResponse {
  error?: string;
  message?: string;
}

export interface FindExistingUserProps {
  myUsers: {
    id: string;
    email: string;
    role: "ADMIN" | "USER";
    password: string;
    createdAt: string;
  }[];
}
export interface UserInfo {
  email: string;
  id: string;
  role: "ADMIN" | "USER";
  createdAt: string;
}

export interface UserMusicInfoProps {
  myUser: {
    music: {
      id: string;
      name: string;
      artist: string;
      url: string;
      category: MusicCategory;
      language: MusicLanguage;
      assetId: string;
    }[];
  };
}

export interface GetMusicProps {
  musics: [
    {
      id: string;
      name: string;
      artist: string;
      url: string;
      category: MusicCategory;
      language: MusicLanguage;
      createdAt: string;
      assetId?: string;
      like?: number;
      dislike?: number;
    }
  ];
}

export interface MusicPlayerProps {
  name: string;
  artist: string;
  url: string;
  category: MusicCategory;
  language: MusicLanguage;
}

export interface CheckSessionResponse {
  email: string;
  exp?: number;
}

export interface MusicFormProps {
  name: string;
  artist: string;
  url: string | null;
  mp3File: File | null;
  category: MusicCategory | "";
  language: MusicLanguage | "";
}
