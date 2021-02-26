import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContex } from "../context/auth";

const AuthRout = ({ component: Component, ...rest }) => {
	const { user } = useContext(AuthContex);

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
};

export default AuthRout;
