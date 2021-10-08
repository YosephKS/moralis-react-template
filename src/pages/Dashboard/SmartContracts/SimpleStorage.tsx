import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import abi from "../../../abi/simpleStorage.json";
import { Web3Context } from "../../../context/Web3Context";

export default function SimpleStorage(
	// eslint-disable-next-line
	_props: RouteComponentProps,
): JSX.Element {
	const { web3, isWeb3Enabled, web3Accounts } = useContext(Web3Context);
	const [contract, setContract] = useState({});
	const [storage, setStorage] = useState("");
	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);

	/**
	 * @description Fetch Data from `SimpleStorage` smart contract
	 * @example
	 * const res = await onGetData();
	 *
	 * @param {Object} inst - Web3 Contract instance
	 */
	const onGetData = async (inst?: any) => {
		const obj = inst ?? contract;
		// @ts-ignore
		const res = await obj.methods.getData().call();
		setStorage(res);
	};

	/**
	 * @description Set new Data to `SimpleStorage` smart contract
	 *
	 * @param {String} newData -
	 */
	const onSetData = async (newData: string) => {
		setLoading(true);
		// @ts-ignore
		await contract.methods.setData(newData).send({ from: web3Accounts[0] });
		// Fetch the newest storage data
		// await onGetData();
		setLoading(false);
	};

	useEffect(() => {
		const onInitialization = async () => {
			// 1. Store contract into React State
			// @ts-ignore
			const res = new web3.eth.Contract(
				// @ts-ignore
				abi,
				"0x8361e44EE9bA2811F026c7d02EB052D90cF9d16A",
			);
			setContract(res);

			// 2. Set inital storage data from blockchain
			await onGetData(res);
			setLoading(false);
		};

		if (isWeb3Enabled) {
			onInitialization();
		}
	}, []);

	return (
		<Grid container spacing={3} direction="column">
			<Grid item xs={12}>
				<Typography variant="h3">Simple Storage</Typography>
			</Grid>
			<Grid item xs={12}>
				{loading ? (
					<CircularProgress size={30} />
				) : (
					<Grid container alignItems="center" spacing={1}>
						<Grid item>
							{editMode ? (
								<TextField
									variant="outlined"
									placeholder="Storage"
									label="Storage"
									type="text"
									value={storage}
									required
									fullWidth
									onChange={(e) => setStorage(e.target.value)}
								/>
							) : (
								<Typography variant="subtitle1">{storage}</Typography>
							)}
						</Grid>
						<Grid item>
							<IconButton
								aria-label="editMode"
								onClick={() => setEditMode((prev) => !prev)}
							>
								{editMode ? <CancelIcon /> : <EditIcon />}
							</IconButton>
						</Grid>
					</Grid>
				)}
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							fullWidth
							onClick={() => {
								setLoading(true);
								onGetData();
								setLoading(false);
							}}
						>
							Get Data
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							fullWidth
							onClick={() => onSetData("Hello Blockchain!")}
						>
							Set Data
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
