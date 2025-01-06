// General Types
export type ChildrenProps = { children: React.ReactNode };

// Event Handlers
export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type OnClickEvent = React.MouseEvent<HTMLButtonElement>;

// Music Types
export type MusicCategory = "remix" | "electronic" | "hip-hop" | "house";
export type MusicLanguage = "persian" | "english" | "turkish" | "other";

// Response Types
export interface FunctionResponse {
  error?: string;
  message?: string;
}

// User Types
export interface LoginFormProps {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
}

export interface FindExistingUserProps {
  myUsers: (User & { password: string })[];
}
export type UserInfo = User;

export interface Music {
  id: string;
  name: string;
  artist: string;
  url: string;
  category: MusicCategory;
  language: MusicLanguage;
  like: number;
  dislike: number;
  assetId?: string;
  createdAt?: string;
}

export interface UserMusicInfo {
  myUser: {
    music: Music[];
  };
}

export interface LikedMusicProps {
  userVotes: Array<{
    music: Music;
  }>;
}

export interface GetMusicProps {
  musics: Music[];
}

export type MusicPlayerProps = Music & { role?: "ADMIN" | "USER" };

export interface MusicFormProps {
  name: string;
  artist: string;
  url: string | null;
  mp3File: File | null;
  category: MusicCategory | "";
  language: MusicLanguage | "";
}

// Session Check
export interface CheckSession {
  email: string;
  id: string;
  role: "ADMIN" | "USER";
  createdAt: string;
}
