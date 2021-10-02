import React, { useEffect } from "react";
import { Router, navigate, useLocation } from "@reach/router";
import { useMoralis } from "react-moralis";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

const Index = () => {
	const { isAuthenticated } = useMoralis();
	const location = useLocation();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		} else if (!isAuthenticated && location.pathname === "/") {
			navigate("/login");
		}
	}, [isAuthenticated, location.pathname]);

	return (
		<Router>
			<Login path="login" />
			<SignUp path="signup" />
			<ForgotPassword path="forgot-password" />
		</Router>
	);
};

export default Index;
