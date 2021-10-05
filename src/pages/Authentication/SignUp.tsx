import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { RouteComponentProps } from "@reach/router";
import Logo from "../../assets/moralis-logo.svg";

interface SignUpType {
	username: string;
	email?: string;
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
export default function SignUp(_props: RouteComponentProps): JSX.Element {
	const classes = useStyles();
	const { signup } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
	const [values, setValues] = useState({
		username: "",
		password: "",
		email: "",
	});

	const onSignUp = async ({ username, password, email }: SignUpType) => {
		await signup(
			username,
			password,
			email,
			{},
			{
				onError: () => {
					enqueueSnackbar("Sign Up Failed.", { variant: "error" });
				},
			},
		);
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
					<Typography variant="h3">Sign Up</Typography>
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
							await onSignUp(values);
						}}
					>
						<TextField
							variant="outlined"
							placeholder="Email"
							type="email"
							value={values.email}
							required
							fullWidth
							className={classes.textField}
							onChange={(e) => setValues({ ...values, email: e.target.value })}
						/>
						<TextField
							variant="outlined"
							placeholder="Username"
							value={values.username}
							required
							fullWidth
							className={classes.textField}
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
							onChange={(e) => setValues({ ...values, password: e.target.value })}
						/>
						<Grid
							container
							className={classes.authorizationContainer}
							justifyContent="space-between"
						>
							<Grid item xs={12}>
								<Typography>
									<Link href="/login">Have an account?</Link>
								</Typography>
							</Grid>
						</Grid>
						<Button
							variant="contained"
							fullWidth
							type="submit"
							color="secondary"
							className={classes.button}
						>
							Create New Account
						</Button>
					</form>
				</Grid>
			</Grid>
		</Grid>
	);
}
