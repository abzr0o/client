import React, { useContext } from "react";
import { Label, Card, Icon, Image, Button, Popup } from "semantic-ui-react";
import moemt from "moment";
import { Link } from "react-router-dom";
import { AuthContex } from "../context/auth";
import LikeButt from "./Like";
import DelteeButt from "./DelteddButt";
function PostCard(props) {
	const { user } = useContext(AuthContex);
	const { username, id, body, createdAt, comC, likes, likesC } = props.post;
	function deleteCall() {
		window.location.reload(false);
	}

	return (
		<Card.Group>
			<Card fluid>
				<Card.Content>
					<Popup
						content={moemt(createdAt).fromNow(true)}
						trigger={
							<Image
								floated="right"
								size="mini"
								src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
							/>
						}
					/>

					<Card.Header>{username}</Card.Header>
					<Card.Meta as={Link} to={`posts/${id}`}>
						{moemt(createdAt).fromNow(true)}
					</Card.Meta>
					<Card.Description>{body}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<LikeButt post={{ id, likesC, likes }} />
					<Popup
						inverted
						content="comment on post"
						trigger={
							<Button labelPosition="right" as={Link} to={`/posts/${id}`}>
								<Button color="purple" basic>
									<Icon name="comment" />
									comment
								</Button>
								<Label basic color="purple" pointing="left">
									{comC}
								</Label>
							</Button>
						}
					/>

					{user && user.username === username && (
						<DelteeButt postId={id} call={deleteCall}></DelteeButt>
					)}
				</Card.Content>
			</Card>
		</Card.Group>
	);
}

export default PostCard;
