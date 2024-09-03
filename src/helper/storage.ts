const TOKEN_KEY = "BEARER_TOKEN";
const USER_KEY = "OIDC_USER";

const getset = (key: string) => {
  return [
    () => {
      return localStorage.getItem(key) || undefined;
    },
    (token?: string) => {
      if (token) {
        localStorage.setItem(key, token);
      } else {
        localStorage.removeItem(key);
      }
    },
  ] as const;
};

export const [getToken, setToken] = getset(TOKEN_KEY);
export const [getUser, setUser] = getset(USER_KEY);
