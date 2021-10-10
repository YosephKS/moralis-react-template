import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useMoralis } from "react-moralis";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Logo from "../../assets/moralis-logo.svg";

interface ForgotPasswordType {
	email: string;
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

export default function ForgotPassword(
	// eslint-disable-next-line
	_props: RouteComponentProps,
): JSX.Element {
	const classes = useStyles();
	const { Moralis } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
	const [values, setValues] = useState({
		email: "",
	});

	const onForgotPassword = async ({ email }: ForgotPasswordType) => {
		try {
			await Moralis.User.requestPasswordReset(email);
			enqueueSnackbar("Sending Reset Password Email Successful.", {
				variant: "success",
			});
		} catch (e) {
			enqueueSnackbar("Sending Reset Password Email Failed.", {
				variant: "error",
			});
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
							await onForgotPassword(values);
						}}
					>
						<TextField
							variant="outlined"
							placeholder="Email"
							type="email"
							label="Email"
							value={values.email}
							required
							fullWidth
							className={classes.textField}
							onChange={(e) => setValues({ ...values, email: e.target.value })}
						/>
						<Grid
							container
							className={classes.authorizationContainer}
							justifyContent="space-between"
						>
							<Grid item xs={12}>
								<Typography>
									<Link href="/login">Remember Password?</Link>
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
							Send Reset Password Email
						</Button>
					</form>
				</Grid>
			</Grid>
		</Grid>
	);
}
