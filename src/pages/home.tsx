import {useQuery} from "@apollo/client";

import {getMeQuery, GetMeQueryResponse} from "../api/user";

import {useOauth2SignIn} from "../hooks";

export default function Home() {
  const {auth, signIn, signOut} = useOauth2SignIn();

  const {loading, data: me} = useQuery<GetMeQueryResponse>(getMeQuery, {
    skip: !auth,
  });

  const login = () => {
    signIn();
  };

  const logout = () => {
    signOut();
  };

  return (
    <div style={{display: "flex", flexDirection:"column", gap: 21, alignItems:"flex-start"}}>
      {loading ? (
        <div>Loading user data...</div>
      ) : me ? (
        <div>
        <div>{`Welcome ${me.getMe.name}`}</div>
        <div>{`Your user id is: ${me.getMe._id}`}</div>
        </div>
      ) : (
        <div>Please login</div>
      )}

      {!auth && <button onClick={login}>Login</button>}
      {auth && <button onClick={logout}>Logout</button>}
    </div>
  );
}
