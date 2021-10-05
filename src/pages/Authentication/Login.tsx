import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useMoralis } from "react-moralis";
import { navigate, RouteComponentProps } from "@reach/router";
import { useSnackbar } from "notistack";
import { Web3Provider } from "react-moralis/lib/hooks/useMoralis/_useMoralisWeb3";
import { AuthType } from "react-moralis/lib/hooks/useMoralis/_useMoralisAuth";
import Logo from "../../assets/moralis-logo.svg";

interface LoginType {
	username: string;
	password: string;
}

const useStyles = makeStyles((theme) => ({
	logo: {
		height: "70px",
		width: "auto",
		marginBottom: theme.spacing(1),
	},
	rootContainer: {
		height: "100vh",
		paddingLeft: "5%",
		paddingRight: "5%",
	},
	contentContainer: {
		maxWidth: "390px",
	},
	titleContainer: {
		marginBottom: theme.spacing(2),
	},
	authorizationContainer: {
		marginBottom: theme.spacing(2),
	},
	textField: {
		marginBottom: theme.spacing(2),
	},
	button: {
		marginBottom: theme.spacing(2),
		height: "50px",
	},
}));

// eslint-disable-next-line
export default function Login(_props: RouteComponentProps): JSX.Element {
	const classes = useStyles();
	const { authenticate, login, isAuthenticating } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
	const initialLoadingButtonValue = {
		email: false,
		metamask: false,
		walletConnect: false,
	};
	const [loadingButton, setLoadingButton] = useState(initialLoadingButtonValue);
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	/**
	 * @description Authenticating Moralis User with Crypto Wallet
	 * @example
	 * const res = await onCrytoLogin('metamask');
	 *
	 * @param {String} type - Crypto Login Option (e.g. Metamask, WalletConnect, or Elrond)
	 */
	const onCryptoLogin = async (type: string) => {
		setLoadingButton({ ...loadingButton, [type]: true });
		const options: () => { provider?: Web3Provider; type?: AuthType } = () => {
			switch (type) {
				case "metamask":
					return {};
				case "walletConnect":
					return { provider: "walletconnect" };
				case "elrond":
					return { type: "erd" };
				default:
					return {};
			}
		};

		await authenticate({
			...options(),
			signingMessage: "React Moralis Crypto Login",
			onSuccess: () => {
				navigate("/dashboard");
			},
			onError: () => {
				enqueueSnackbar("Crypto Login Failed.", { variant: "error" });
				setLoadingButton(initialLoadingButtonValue);
			},
		});
	};

	/**
	 * @description Login Moralis User with traditional email and password
	 * @example
	 * const res = await onEmailLogin({
	 * 	username: "xxx",
	 * 	password: "xxx"
	 * });
	 *
	 * @param {String} username = Username of the user
	 * @param {String} password = Password of the user
	 */
	const onEmailLogin = async ({ username, password }: LoginType) => {
		setLoadingButton({ ...loadingButton, email: true });
		await login(username, password, {
			onSuccess: () => {
				navigate("/dashboard");
			},
			onError: () => {
				enqueueSnackbar("Email Login Failed.", { variant: "error" });
				setLoadingButton(initialLoadingButtonValue);
			},
		});
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
			spacing={2}
			className={classes.rootContainer}
		>
			<Grid item className={classes.contentContainer}>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignContent="center"
					className={classes.titleContainer}
				>
					<img src={Logo} alt="Moralis Logo" className={classes.logo} />
					<Typography variant="h3">Log In</Typography>
				</Grid>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
				>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							await onEmailLogin(values);
						}}
					>
						<TextField
							variant="outlined"
							placeholder="Username"
							value={values.username}
							required
							fullWidth
							className={classes.textField}
							disabled={isAuthenticating}
							onChange={(e) => setValues({ ...values, username: e.target.value })}
						/>
						<TextField
							variant="outlined"
							placeholder="Password"
							type="password"
							required
							value={values.password}
							fullWidth
							className={classes.textField}
							disabled={isAuthenticating}
							onChange={(e) => setValues({ ...values, password: e.target.value })}
						/>
						<Grid
							container
							className={classes.authorizationContainer}
							justifyContent="space-between"
						>
							<Grid item xs={6}>
								<Typography>
									<Link href="/forgot-password">Forgot Password?</Link>
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography align="right">
									<Link href="/signup">No account?</Link>
								</Typography>
							</Grid>
						</Grid>
						<Button
							variant="outlined"
							fullWidth
							type="submit"
							disabled={isAuthenticating}
							className={classes.button}
						>
							{loadingButton.email ? <CircularProgress size={30} /> : "Login"}
						</Button>
					</form>
					<Button
						variant="contained"
						onClick={() => onCryptoLogin("metamask")}
						fullWidth
						color="secondary"
						disabled={isAuthenticating}
						className={classes.button}
					>
						{loadingButton.metamask ? (
							<CircularProgress size={30} />
						) : (
							"Login with Metamask"
						)}
					</Button>
					<Button
						variant="contained"
						onClick={() => onCryptoLogin("walletConnect")}
						fullWidth
						color="primary"
						disabled={isAuthenticating}
						className={classes.button}
					>
						{loadingButton.walletConnect ? (
							<CircularProgress size={30} />
						) : (
							"Login with WalletConnect"
						)}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
