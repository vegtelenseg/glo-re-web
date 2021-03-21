import axios from "axios";
import * as React from "react";

export type AuthContextType =
  | {
      token: string;
      authenticated: true;
      username: string;
      role: string;
    }
  | {
      authenticated: false;
    };

export interface UserAuthInfoType {
  token: string;
  username: string;
}

export interface AuthContextStateType {
  auth: AuthContextType;
  handleLogin: (userInfo: UserAuthInfoType) => Promise<void>;
  getToken(): string;
  handleLogout(): void;
}

const AuthContextState: AuthContextStateType = {
  auth: { authenticated: false },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogin: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getToken: () => "",
};

export const AuthContext = React.createContext<AuthContextStateType>(
  AuthContextState
);

interface Props {
  children: React.ReactNode;
}

export function AuthController({ children }: Props) {
  const [auth, setAuth] = React.useState(() => {
    let auth: AuthContextType = { authenticated: false };
    const authString = localStorage.getItem("auth");
    if (authString) {
      const localAuth = JSON.parse(authString);
      if (localAuth) {
        auth = {
          authenticated: localAuth.authenticated,
          token: localAuth.accessToken,
          username: localAuth.username,
          role: localAuth.role,
        };
      }
    }

    return auth;
  });

  const handleLogin = React.useCallback(
    async (userInfo: { password: string; username: string }) => {
      const response = await axios.post(
        `http://localhost:5000/login`,
        userInfo
      );
      if (response && response.data?.authenticated) {
        const auth: AuthContextType = {
          authenticated: true,
          token: response.data.accessToken,
          username: response.data.username,
          role: response.data.role,
        };
        setAuth(auth);
        localStorage.setItem("auth", JSON.stringify(response.data));
        // TODO: history.push('/)
        window.location.pathname = "/";
      }
    },
    [setAuth]
  );

  const getToken = React.useCallback(() => {
    if (auth.authenticated) {
      return auth.token;
    } else {
      return "";
    }
  }, [auth]);

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem("auth");
    setAuth({ authenticated: false });
  }, []);

  const value = React.useMemo(
    () => ({ auth, handleLogin, handleLogout, getToken }),
    [auth, handleLogin, handleLogout, getToken]
  );
  return (
    // @ts-ignore
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
