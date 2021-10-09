import React, { createContext, useEffect, useState, useMemo } from "react";
import { useMoralis } from "react-moralis";
import { useSnackbar } from "notistack";
import PropTypes, { InferProps } from "prop-types";
import useSWR from "swr";

interface Web3BlockchainType {
	chain?: string;
	chainId?: number;
	ens?: {
		registry: string;
	};
	explorers?: Array<any>;
	name?: string;
	nativeCurrency?: {
		name?: string;
		symbol?: string;
		decimals?: number;
	};
	network?: string;
	networkId?: number;
	rpc?: Array<any>;
	shortname?: string;
	slip44?: number;
}

export const Web3Context = createContext({
	web3: {},
	isWeb3Enabled: false,
	web3Accounts: [] as string[],
	web3BlockchainData: {} as Web3BlockchainType,
});

export default function Web3ContextProvider(
	props: InferProps<typeof Web3ContextProvider.propTypes>,
): JSX.Element {
	const { children } = props;
	const { enqueueSnackbar } = useSnackbar();
	const { web3, isWeb3Enabled, enableWeb3 } = useMoralis();
	const [web3Accounts, setWeb3Accounts] = useState([]);
	const [web3ChainId, setWeb3ChainId] = useState(0);
	const [web3NetworkId, setWeb3NetworkId] = useState(0);
	const { data } = useSWR("https://chainid.network/chains.json", async (url) => {
		try {
			const res = await fetch(url);
			return res.json();
		} catch (e) {
			enqueueSnackbar("Failed to detect network.", { variant: "error" });
		}
	});
	const web3BlockchainData = useMemo(() => {
		if (web3ChainId && web3NetworkId) {
			return data?.find((d: Web3BlockchainType) => {
				const { chainId, networkId } = d;
				return chainId === web3ChainId && networkId === web3NetworkId;
			});
		}

		return {};
	}, [data, web3ChainId, web3NetworkId]);

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

			// 5. Fetch Network Id
			await web3.eth.net.getId((error, id) => {
				if (error) {
					enqueueSnackbar("Sending Reset Password Email Failed.", {
						variant: "error",
					});
				} else {
					setWeb3NetworkId(id);
				}
			});
		};

		if (web3 && !isWeb3Enabled) {
			onInitialization();
		}
	}, []);

	return web3 && isWeb3Enabled ? (
		<Web3Context.Provider
			value={{ web3, isWeb3Enabled, web3Accounts, web3BlockchainData }}
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
