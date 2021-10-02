import React from "react";
import { Router } from "@reach/router";
import { useMoralis } from "react-moralis";
import Login from "./pages/Authentication/index";
import Dashboard from "./pages/Dashboard/index";

const App = () => {
	const { isAuthenticated } = useMoralis();

	return (
		<Router>
			{isAuthenticated ? <Dashboard path="/*" /> : <Login path="/*" />}
		</Router>
	);
};

export default App;
