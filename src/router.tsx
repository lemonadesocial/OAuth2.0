import { createBrowserRouter } from "react-router-dom";

import { loginRedirectUri, logoutRedirectUri } from "./config";

import Home from "./pages/home";
import OAuth2Callback from "./pages/oauth2-callback";
import Logout from "./pages/logout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: logoutRedirectUri,
    element: <Logout/>
  },
  {
    path: loginRedirectUri,
    element: <OAuth2Callback/>
  },
]);
