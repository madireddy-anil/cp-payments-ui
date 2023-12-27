import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as _ApolloProvider,
  HttpLink,
  ApolloLink
} from "@apollo/client";
import { AuthContext } from "@payconstruct/orbital-auth-provider";

import { createAuthLink, AuthOptions } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { region, graphQHttpUrl, graphQlWebsocketUrl } from "config/variables";

const ApolloProvider: React.FC = ({ children }) => {
  const { token = "" } = useContext(AuthContext);

  const auth: AuthOptions = {
    type: "OPENID_CONNECT",
    jwtToken: async () => token // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  };

  const httpLink = new HttpLink({
    uri: graphQHttpUrl
  });

  const link = ApolloLink.from([
    createAuthLink({ url: graphQlWebsocketUrl, region: region, auth }),
    createSubscriptionHandshakeLink(
      { url: graphQlWebsocketUrl, region: region, auth },
      httpLink
    )
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return <_ApolloProvider client={client}>{children}</_ApolloProvider>;
};

export { ApolloProvider };
