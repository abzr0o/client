import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Menubar from "./components/Menubar";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import "./util.css";
import { AuthProvider } from "./context/auth";
import AuthRout from "./util/AuthRout";
import Single from "./components/Single";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Menubar />
					<Route path="/" exact component={Home}></Route>
					<AuthRout path="/login" exact component={Login}></AuthRout>
					<AuthRout path="/Register" exact component={Register}></AuthRout>
					<Route exact path="/posts/:postId" component={Single} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
