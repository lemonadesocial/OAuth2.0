import {useState} from "react";

import {getUserManager, restoreUser} from "./helper/oidc";
import {getToken, setToken} from "./helper/storage";
import {getUser, setUser} from "./helper/storage";

export function useOauth2SignIn(redirct_uri?: string) {
  const [auth, setAuth] = useState(!!getToken());

  const signIn = async () => {
    const userManager = getUserManager();

    await userManager.signinRedirect({
      scope: "openid offline_access",
      redirect_uri: redirct_uri || `${window.location.origin}/oauth2/callback`,
    });
  };

  const processSignIn = async () => {
    const userManager = getUserManager();

    const response = await userManager.signinRedirectCallback();

    setToken(response.access_token);
    setUser(response.toStorageString());

    setAuth(true);
  };

  const signOut = async (redirect_uri?: string) => {
    const userManager = getUserManager();

    const userString = getUser();

    const user = userString ? await restoreUser(userString) : undefined;

    if (!user) throw new Error("Cannot restore user");

    userManager.signoutRedirect({
      post_logout_redirect_uri:
        redirect_uri || `${window.location.origin}/logout`,
      id_token_hint: user?.id_token,
    });
  };

  const processSignOut = async () => {
    const userManager = getUserManager();

    await userManager.signoutRedirectCallback();

    setToken();
    setUser();

    setAuth(false);
  };

  return {auth, signIn, processSignIn, signOut, processSignOut};
}
