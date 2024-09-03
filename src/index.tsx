import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";

import {gqlClient} from "./helper/graphql";

import {router} from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={gqlClient}>
    <RouterProvider router={router} />
  </ApolloProvider>,
);
