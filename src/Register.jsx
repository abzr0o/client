import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { AuthContex } from "./context/auth";

import { useForm } from "./util/Hooks";

function Register(props) {
	const contex = useContext(AuthContex);
	const [errs, seterrs] = useState({});

	const { onchange, onSubmit, data } = useForm(regs, {
		username: "",
		password: "",
		confoirmpassword: "",
		email: "",
	});

	const [addUser, { loading }] = useMutation(reg_user, {
		update(proxy, { data: { register: userdata } }) {
			contex.login(userdata);
			props.history.push("/");
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.exception.err);
			seterrs(err.graphQLErrors[0].extensions.exception.err);
		},
		variables: data,
	});

	function regs(e) {
		addUser();
	}

	return (
		<div className={loading ? "loading" : ""}>
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<form className={"login100-form validate-form"}>
							<span className="login100-form-title p-b-26">Welcome</span>
							<span className="login100-form-title p-b-48">
								<i className="zmdi zmdi-font"></i>
							</span>

							<div className="wrap-input100 validate-input">
								<input
									className="input100"
									type="text"
									name="username"
									autoComplete="off"
									onChange={onchange}
								/>
								<span
									className="focus-input100"
									data-placeholder="username"
								></span>
							</div>
							<div className="wrap-input100 validate-input">
								<input
									className="input100"
									type="text"
									name="email"
									autoComplete="on"
									onChange={onchange}
								/>
								<span
									className="focus-input100"
									data-placeholder="email"
								></span>
							</div>
							<div className="wrap-input100 validate-input">
								<input
									className="input100"
									type="password"
									name="password"
									autoComplete="off"
									onChange={onchange}
								/>
								<span
									className="focus-input100"
									data-placeholder="password"
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
									name="confoirmpassword"
									autoComplete="off"
									onChange={onchange}
								/>
								<span
									className="focus-input100"
									data-placeholder="confoirmpassword"
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
										Register
									</button>
								</div>
							</div>
							{Object.keys(errs).length > 0 && (
								<div className="ui error message">
									<ul className="list">
										{Object.values(errs).map((value) => (
											<li key={value} className="content">
												{value}
											</li>
										))}
									</ul>
								</div>
							)}

							<div className="text-center p-t-115">
								<span className="txt1">Have already account </span>

								<a className="txt2" href="/Login">
									Login
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

const reg_user = gql`
	mutation register(
		$username: String!
		$password: String!
		$email: String!
		$confoirmpassword: String!
	) {
		register(
			registerInput: {
				username: $username
				password: $password
				email: $email
				conformPassword: $confoirmpassword
			}
		) {
			id
			token
			username
			createAt
		}
	}
`;

export default Register;
