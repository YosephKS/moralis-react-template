import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useMoralisCloudFunction } from "react-moralis";

export default function SmartContracts(
	// eslint-disable-next-line
	_props: RouteComponentProps,
): JSX.Element {
	const { data, isLoading } = useMoralisCloudFunction("test");
	return <>{isLoading ? "Loading" : data}</>;
}
