import React from "react";
import { Router } from "@reach/router";
import { useMoralis } from "react-moralis";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";

export default function App(): JSX.Element {
	const { isAuthenticated } = useMoralis();

	return (
		<Router>
			{isAuthenticated ? <Dashboard path="/*" /> : <Authentication path="/*" />}
		</Router>
	);
}
