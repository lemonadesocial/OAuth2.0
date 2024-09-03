import {User, UserManager} from "oidc-client-ts";

import {hydraClientId, hydraClientSecret, hydraUrl} from "../config";

let _userManager: UserManager;

export const getUserManager = () => {
  if (!_userManager) {
    const oauth2Url = hydraUrl;
    const client_id = hydraClientId;
    const client_secret = hydraClientSecret;

    if (!oauth2Url || !client_id || !client_secret) {
      throw new Error("Missing oauth2 config");
    }

    _userManager = new UserManager({
      automaticSilentRenew: false,
      authority: oauth2Url,
      metadata: {
        authorization_endpoint: `${oauth2Url}/oauth2/auth`,
        token_endpoint: `${oauth2Url}/oauth2/token`,
        userinfo_endpoint: `${oauth2Url}/userinfo`,
        end_session_endpoint: `${oauth2Url}/oauth2/sessions/logout`,
      },
      client_id,
      client_secret,
      redirect_uri: `${window.location.origin}/oauth2/callback`,
      response_mode: "query",
    });
  }

  return _userManager;
};

export const restoreUser = async (oidcUserString: string) => {
  const userManager = getUserManager();

  const user = User.fromStorageString(oidcUserString);

  if (!user || !user.access_token) return;

  await userManager.storeUser(user);

  if (user.expired) {
    return await userManager.signinSilent();
  }

  return user;
};
