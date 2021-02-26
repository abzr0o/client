import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import React from "react";
import { useState, useContext } from "react";
import { AuthContex } from "./context/auth";

import { useForm } from "./util/Hooks";

function Login(props) {
	const contex = useContext(AuthContex);
	const [err, seterr] = useState({});

	const { onSubmit, onchange, data } = useForm(login, {
		username: "",
		password: "",
	});

	const [addUser, { loading }] = useMutation(Login_user, {
		update(_, { data: { login: userdata } }) {
			contex.login(userdata);
			props.history.push("/");
		},
		onError(err) {
			seterr(err.graphQLErrors[0].extensions.exception.err);
		},
		variables: data,
	});

	function login(e) {
		addUser();
	}

	return (
		<div>
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<form
							className={loading ? "loading" : "login100-form validate-form"}
						>
							<span className="login100-form-title p-b-26">Welcome</span>
							<span className="login100-form-title p-b-48">
								<i className="zmdi zmdi-font"></i>
							</span>

							<div className="wrap-input100 validate-input">
								<input
									className="input100"
									type="text"
									name="username"
									value={data.username}
									onChange={onchange}
									autoComplete="off"
								/>
								<span
									className="focus-input100"
									data-placeholder="username"
								></span>
							</div>

							<div
								className="wrap-input100 validate-input"
								data-validate="Enter password"
							>
								<span className="btn-show-pass">
									<i className="zmdi zmdi-eye"></i>
								</span>
								<input
									className="input100"
									type="password"
									name="password"
									value={data.password}
									onChange={onchange}
									autoComplete="off"
								/>
								<span
									className="focus-input100"
									data-placeholder="Password"
								></span>
							</div>

							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
									<button
										className="login100-form-btn"
										type="submit"
										onClick={onSubmit}
									>
										Login
									</button>
								</div>
							</div>

							<div className="text-center p-t-115">
								{Object.keys(err).length > 0 && (
									<div className="ui error message">
										<ul className="list">
											{Object.values(err).map((value) => (
												<li key={value} className="content">
													{value}
												</li>
											))}
										</ul>
									</div>
								)}
								<span className="txt1">Don’t have an account? </span>

								<a className="txt2" href="/register">
									Sign Up
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

const Login_user = gql`
	mutation login($username: String!, $password: String!) {
		login(password: $password, username: $username) {
			id
			username
			token
			createAt
		}
	}
`;

export default Login;
