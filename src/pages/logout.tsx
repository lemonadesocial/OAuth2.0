import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useOauth2SignIn} from "../hooks";

export default function Logout() {
  const navigate = useNavigate();
  const {auth, processSignOut} = useOauth2SignIn();

  useEffect(() => {
    processSignOut();
  }, []);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  return <div>Loging out...</div>;
}
