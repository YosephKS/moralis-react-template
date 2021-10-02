import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import { useMoralis } from "react-moralis";
import { navigate } from "@reach/router";

const useStyles = makeStyles({
	rootContainer: {
		height: "100vh",
		paddingTop: "5vh",
		paddingLeft: "5%",
		paddingRight: "5%",
	},
	titleContainer: {
		marginBottom: "1rem",
	},
	authorizationContainer: {
		marginBottom: "1rem",
	},
	textField: {
		marginBottom: "1rem",
	},
	button: {
		marginBottom: "1rem",
		height: "50px",
	},
});

const Login = () => {
	const classes = useStyles();
	const { authenticate, login } = useMoralis();
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const onLogin = async () => {
		await authenticate();
	};

	const onNonCryptoLogin = async ({ username, password }) => {
		const res = await login(username, password);

		// If no existing user found, create new one
		if (!res) {
			// throw error snackbar
			console.error("No user found");
		} else {
			navigate("/");
		}
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
			<Grid item xs={12}>
				<Grid
					container
					justifyContent="center"
					alignContent="center"
					className={classes.titleContainer}
				>
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
							await onNonCryptoLogin(values);
						}}
					>
						<TextField
							variant="outlined"
							placeholder="Username"
							value={values.username}
							required
							fullWidth
							className={classes.textField}
							onChange={(e) =>
								setValues({ ...values, username: e.target.value })
							}
						/>
						<TextField
							variant="outlined"
							placeholder="Password"
							type="password"
							required
							value={values.password}
							fullWidth
							className={classes.textField}
							onChange={(e) =>
								setValues({ ...values, password: e.target.value })
							}
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
									<Link href="/signup">Have no account yet?</Link>
								</Typography>
							</Grid>
						</Grid>
						<Button
							variant="outlined"
							fullWidth
							type="submit"
							className={classes.button}
						>
							Login
						</Button>
					</form>
					<Button
						variant="contained"
						onClick={onLogin}
						fullWidth
						color="secondary"
						className={classes.button}
					>
						Login with Metamask
					</Button>
					<Button
						variant="contained"
						onClick={onLogin}
						fullWidth
						color="primary"
						className={classes.button}
					>
						Login with WalletConnect
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Login;
