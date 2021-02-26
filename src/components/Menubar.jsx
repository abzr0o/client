import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContex } from "../context/auth";

function Menubar() {
	const { user, logout } = useContext(AuthContex);
	const pathname = window.location.pathname;

	const path = pathname === "/" ? "home" : pathname.substr(1);
	function handleItemClick(e, { name }) {
		setactveitem(name);
	}
	const [activeItem, setactveitem] = useState(path);

	const Menubar = user ? (
		<Menu pointing secondary size="massive" color="purple">
			<Menu.Item name={user.username} active as={Link} to="/" />
			<Menu.Menu position="right">
				<Menu.Item name="logout" onClick={logout} />
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary size="massive" color="purple">
			<Menu.Item
				name="home"
				active={activeItem === "home"}
				onClick={handleItemClick}
				as={Link}
				to="/"
			/>
			<Menu.Menu position="right">
				<Menu.Item
					name="login"
					active={activeItem === "login"}
					onClick={handleItemClick}
					as={Link}
					to="/login"
				/>
				<Menu.Item
					name="register"
					active={activeItem === "register"}
					onClick={handleItemClick}
					as={Link}
					to="/register"
				/>
			</Menu.Menu>
		</Menu>
	);

	return Menubar;
}
export default Menubar;
