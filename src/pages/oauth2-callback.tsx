import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useOauth2SignIn} from "../hooks";

export default function OAuth2Callback() {
  const navigate = useNavigate();
  const {auth, processSignIn} = useOauth2SignIn();

  useEffect(() => {
    processSignIn();
  }, []);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  return <div>Redirecting...</div>;
}
