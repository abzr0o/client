import React from "react";
import { ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloClient } from "apollo-client";

import App from "./App";
import { setContext } from "apollo-link-context";
const l = createHttpLink({ uri: "http://localhost:4000/graphql" });
const link = setContext(() => {
	const token = localStorage.getItem("jwtoken");
	return {
		headers: {
			authorization: token ? `bearer ${token}` : "",
		},
	};
});
const client = new ApolloClient({
	link: link.concat(l),
	cache: new InMemoryCache(),
});
export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
