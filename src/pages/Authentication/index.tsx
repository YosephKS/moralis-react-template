import React, { useEffect } from "react";
import {
	Router,
	navigate,
	useLocation,
	RouteComponentProps,
} from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

// eslint-disable-next-line
export default function Index(_props: RouteComponentProps): JSX.Element {
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/login");
		}
	}, [location.pathname]);

	return (
		<Router>
			<Login path="login" />
			<SignUp path="signup" />
			<ForgotPassword path="forgot-password" />
		</Router>
	);
}
