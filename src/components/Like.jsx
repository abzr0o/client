import { from } from "@apollo/client";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Label, Icon } from "semantic-ui-react";
import { gql } from "graphql-tag";
import { AuthContex } from "../context/auth";
import { useMutation } from "@apollo/client";

function Like({ post: { id, likesC, likes } }) {
	const { user } = useContext(AuthContex);
	const [Liked, setLiked] = useState(false);
	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);
	function send() {
		likePost();
		window.location.reload(false);
	}
	const [likePost] = useMutation(LikedPost_mut, {
		variables: { postId: id },
	});

	const likedButten = user ? (
		Liked ? (
			<Button color="red">
				<Icon name="heart" />
				love
			</Button>
		) : (
			<Button color="red" basic>
				<Icon name="heart" />
				love
			</Button>
		)
	) : (
		<Button as={Link} to="/login" color="red" basic>
			<Icon name="heart" />
			love
		</Button>
	);
	return (
		<Button as="div" labelPosition="right" onClick={send}>
			{likedButten}
			<Label basic color="red" pointing="left">
				{likesC}
			</Label>
		</Button>
	);
}

const LikedPost_mut = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likesC
		}
	}
`;

export default Like;
