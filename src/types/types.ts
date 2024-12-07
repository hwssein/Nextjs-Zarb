export type Children = Readonly<{ children: React.ReactNode }>;
export type Bool = boolean;

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

export interface CheckSessionResponse {
  email: string;
  exp?: number;
}
