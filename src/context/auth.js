import React from "react";
import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const init = { user: null };
if (localStorage.getItem("jwtoken")) {
	const token = jwtDecode(localStorage.getItem("jwtoken"));

	if (token.exp * 1000 < Date.now()) {
		localStorage.removeItem("jwtoken");
	} else {
		init.user = token;
	}
}

const AuthContex = createContext({
	user: null,
	login: (userdata) => {},
	logout: () => {},
});

const reduser = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(reduser, init);
	function login(userdata) {
		localStorage.setItem("jwtoken", userdata.token);
		dispatch({
			type: "LOGIN",
			payload: userdata,
		});
	}
	function logout() {
		localStorage.removeItem("jwtoken");
		dispatch({
			type: "LOGOUT",
		});
	}
	return (
		<AuthContex.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
};

export { AuthContex, AuthProvider };
