import {gql} from "@apollo/client";

export const getMeQuery = gql`
  query {
    getMe {
      _id
      email
      name
    }
  }
`;

export interface GetMeQueryResponse {
  getMe: {
    _id: string;
    name: string;
    email?: string;
  };
}
