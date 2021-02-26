import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";

import { Grid, Transition } from "semantic-ui-react";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import { AuthContex } from "./context/auth";
import { Feth_P } from "./query";

function Home() {
	const { user } = useContext(AuthContex);

	const { loading, data } = useQuery(Feth_P);

	return (
		<Grid columns={3} divided>
			<Grid.Row className="colmid">
				{user && (
					<Grid.Column className="col1mid">
						<PostForm />
					</Grid.Column>
				)}
			</Grid.Row>
			<Grid.Row className="hiiii">
				<h1>recent posts</h1>
			</Grid.Row>
			<Grid.Row columns="4" className="rowmid">
				{loading ? (
					<h1>loadding</h1>
				) : (
					data.getPosts &&
					data.getPosts.map((post) => (
						<Grid.Column
							key={post.id}
							style={{ marginBottom: 20, marginLeft: 22 }}
						>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
}

export default Home;
