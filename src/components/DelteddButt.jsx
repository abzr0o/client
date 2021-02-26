import React from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useState } from "react/cjs/react.development";
import { Feth_P } from "../query";

function DelteddButt({ postId, commentId, call }) {
	const [Conf, setConf] = useState(false);
	function dellll() {
		delte();
		if (call) {
			call();
			window.location.reload(false);
		}
	}
	const Mut = commentId ? delCom : Delss;
	const [delte] = useMutation(Mut, {
		update(proxy, res) {
			setConf(false);
			if (!commentId) {
				const data = proxy.readQuery({
					query: Feth_P,
				});
				data.getPosts = data.getPosts.filter((p) => p.id !== postId);
				proxy.writeQuery({ query: Feth_P, data: data });
			}
		},
		variables: {
			postId,
			commentId,
		},
	});
	return (
		<>
			<Button
				as="div"
				color="red"
				onClick={() => setConf(true)}
				floated="right"
			>
				<Icon name="trash" className="import" />
			</Button>
			<Confirm
				open={Conf}
				onCancel={() => setConf(false)}
				onConfirm={dellll}
			></Confirm>
		</>
	);
}

const Delss = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;
const delCom = gql`
	mutation deletecomment($postId: ID!, $commentId: ID!) {
		deletecomment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				body
				username
			}
			comC
		}
	}
`;

export default DelteddButt;
