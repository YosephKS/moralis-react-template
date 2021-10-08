import React from "react";
import { RouteComponentProps, Router } from "@reach/router";
import SmartContracts from "./SmartContracts";
import SimpleStorage from "./SimpleStorage";

export default function Index(
	// eslint-disable-next-line
	_props: RouteComponentProps,
): JSX.Element {
	return (
		<Router>
			<SmartContracts path="/" />
			<SimpleStorage path="simple-storage" />
		</Router>
	);
}
