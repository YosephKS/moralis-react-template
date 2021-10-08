import React, { createContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSnackbar } from "notistack";
import PropTypes, { InferProps } from "prop-types";

export const Web3Context = createContext({
	web3: {},
	isWeb3Enabled: false,
	web3Accounts: [] as string[],
	web3ChainId: 0,
});

export default function Web3ContextProvider(
	props: InferProps<typeof Web3ContextProvider.propTypes>,
): JSX.Element {
	const { children } = props;
	const { enqueueSnackbar } = useSnackbar();
	const { web3, isWeb3Enabled, enableWeb3 } = useMoralis();
	const [web3Accounts, setWeb3Accounts] = useState([]);
	const [web3ChainId, setWeb3ChainId] = useState(0);

	useEffect(() => {
		const onInitialization = async () => {
			// 1. Enable Web3 (Ask permission)
			enableWeb3();

			// 2. Set Provider to speedy nodes
			// @ts-ignore
			web3.setProvider(ethereum);

			// 3. Fetch Web3 Acount
			await web3.eth.getAccounts((error, accounts) => {
				if (error) {
					enqueueSnackbar("Sending Reset Password Email Failed.", {
						variant: "error",
					});
				} else {
					setWeb3Accounts(accounts);
				}
			});

			// 4. Fetch Chain Id
			await web3.eth.getChainId((error, version) => {
				if (error) {
					enqueueSnackbar("Sending Reset Password Email Failed.", {
						variant: "error",
					});
				} else {
					setWeb3ChainId(version);
				}
			});
		};

		if (web3 && !isWeb3Enabled) {
			onInitialization();
		}
	}, []);

	return web3 && isWeb3Enabled ? (
		<Web3Context.Provider
			value={{ web3, isWeb3Enabled, web3Accounts, web3ChainId }}
		>
			{children}
		</Web3Context.Provider>
	) : (
		<>{children}</>
	);
}

Web3ContextProvider.propTypes = {
	children: PropTypes.node,
};

Web3ContextProvider.defaultProps = {
	children: <></>,
};
