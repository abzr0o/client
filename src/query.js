import { gql } from "graphql-tag";
export const Feth_P = gql`
	{
		getPosts {
			body
			id
			username
			comC
			comments {
				body
				id
				username
				CreatedAt
			}
			likes {
				username
				id
				CreatedAt
			}
			likesC
			createdAt
		}
	}
`;
