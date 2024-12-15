export type UserType = {
  id: number;
  name: string;
  email: string;
  img: string;
  status: string;
};

export type AuthContextType = {
  user: UserType | undefined;
  token: string | null;
  login: (_token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};
