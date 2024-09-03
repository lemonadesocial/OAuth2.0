import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import OAuth2Callback from "./pages/oauth2-callback";
import Logout from "./pages/logout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/oauth2/callback",
    element: <OAuth2Callback/>
  },
]);
