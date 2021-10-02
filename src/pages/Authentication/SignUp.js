import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
	rootContainer: {
		height: "100vh",
		paddingTop: "10vh",
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

const SignUp = () => {
	const classes = useStyles();
	const { signup } = useMoralis();
	const [values, setValues] = useState({
		username: "",
		password: "",
		email: "",
	});

	const onSignUp = async ({ username, password, email }) => {
		try {
			await signup(username, password, email);
		} catch (e) {
			console.error(e);
			// throw error snackbar
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
							<Grid item xs={12}>
								<Typography>
									<Link href="/login">Have an account?</Link>
								</Typography>
							</Grid>
						</Grid>
						<Button
							variant="outlined"
							fullWidth
							type="submit"
							className={classes.button}
						>
							Create New Account
						</Button>
					</form>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SignUp;
