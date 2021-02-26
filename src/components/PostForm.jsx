import { useMutation } from "@apollo/client";
import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/Hooks";
import { gql } from "graphql-tag";
import { Feth_P } from "../query";

function PostForm() {
	const { onSubmit, onchange, data } = useForm(createPosttt, { body: "" });

	const [createPost, { error }] = useMutation(Post_M, {
		variables: data,
		update(proxy, result) {
			const datas = proxy.readQuery({
				query: Feth_P,
			});
			let Newdata = [result.data.createPosts, ...datas.getPosts];
			proxy.writeQuery({ query: Feth_P, Newdata });
			console.log(datas);
			data.body = "";
		},
	});
	function createPosttt() {
		createPost();
		window.location.reload(false);
	}
	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Creat a post:</h2>
				<Form.Field>
					<Form.Input
						placeholder="hi world"
						onChange={onchange}
						name="body"
						value={data.body}
					/>
					<Button type="submit" color="purple">
						submit
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className="ui error message" style={{ marginBottom: 10 }}>
					<ui className="list">
						<li>{error.graphQLErrors[0].message}</li>
					</ui>
				</div>
			)}
		</>
	);
}

const Post_M = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			username
			id
			body
			comments {
				username
				id
				body
				CreatedAt
			}
			comC
			createdAt
			likes {
				username
				CreatedAt
				id
			}
			likesC
		}
	}
`;

export default PostForm;
