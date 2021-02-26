import React, { useContext, useState, useRef } from "react";
import { gql } from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

import {
	Card,
	Grid,
	Image,
	Button,
	Icon,
	Label,
	Form,
} from "semantic-ui-react";
import moment from "moment";
import Like from "./Like";
import { AuthContex } from "../context/auth";
import Del from "./DelteddButt";
import DelteddButt from "./DelteddButt";

function Single(props) {
	const [Comments, setComments] = useState("");
	const { user } = useContext(AuthContex);
	const comref = useRef(null);
	const postId = props.match.params.postId;
	function sendcomment() {
		createC();
		window.location.reload(false);
	}
	const [createC] = useMutation(Submitcc, {
		update() {
			setComments();
			comref.current.blur();
		},
		variables: {
			postId,
			body: Comments,
		},
	});
	const { data } = useQuery(Feth, {
		variables: {
			postId,
		},
	});
	function deleteCall() {
		props.history.push("/");
	}
	let PostMark;
	if (!data) {
		PostMark = <p>loading ...</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likesC,
			comC,
		} = data.getPost;

		PostMark = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
							size="small"
							floated="right"
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<Like post={{ id, likesC, likes }} />
								<Button as="div" labelPosition="right">
									<div className="ui  button purple" id="stopit">
										<Icon name="comments"></Icon>
									</div>
									<Label basic color="purple" pointing="left" id="stopit">
										{comC}
									</Label>
								</Button>
								{user && user.username === username && (
									<Del postId={id} call={deleteCall} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									{" "}
									<p>post a comment</p>
									<Form>
										<div className="ui action input fluid purple">
											<input
												className="goforit"
												type="text"
												placeholder="commment.."
												value={Comments}
												onChange={(event) => setComments(event.target.value)}
												style={{ border: "1px solid #a333c8" }}
												id="goforit"
												ref={comref}
											/>
											<button
												type="submit"
												className="ui button purple"
												disabled={Comments.trim() === ""}
												onClick={sendcomment}
												// style={{ backgroundColor: "#a333c8", color: "white" }}
											>
												submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DelteddButt
											postId={id}
											commentId={comment.id}
										></DelteddButt>
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>
										{moment(comment.CreatedAt).fromNow(true)}
									</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return PostMark;
}

const Submitcc = gql`
	mutation createcomment($postId: ID!, $body: String!) {
		createcomment(postId: $postId, body: $body) {
			body
			id
			comments {
				id
				body
				CreatedAt
				username
			}
			createdAt
			comC
			likes {
				id
				username
				CreatedAt
			}
			likesC
		}
	}
`;

const Feth = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			username
			likesC
			likes {
				username
				CreatedAt
			}
			comC
			comments {
				id
				username
				CreatedAt
				body
			}
		}
	}
`;

export default Single;
