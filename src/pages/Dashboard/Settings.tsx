import React, { useState, useMemo } from "react";
import PropTypes, { InferProps } from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { RouteComponentProps } from "@reach/router";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "55%",
		},
	},
	title: {
		marginBottom: theme.spacing(1),
	},
	subtitle: {
		marginBottom: theme.spacing(3),
	},
	textField: {
		marginBottom: theme.spacing(3),
	},
	button: {
		height: "50px",
	},
}));

export default function Settings(
	props: InferProps<typeof Settings.propTypes> & RouteComponentProps,
): JSX.Element {
	const { user, setUserData, loading } = props;
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const initialUserValues = useMemo(() => {
		return {
			username: user.get("username"),
			email: user.get("email"),
		};
	}, [user]);
	const [values, setValues] = useState(initialUserValues);

	const onUpdateUserData = async () => {
		try {
			const { username, email } = values;
			await setUserData({
				username,
				email,
			});
			enqueueSnackbar("Update User Data Successful.", { variant: "success" });
		} catch (e) {
			enqueueSnackbar("Update User Data Failed.", { variant: "error" });
		}
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			className={classes.root}
		>
			<Typography variant="h4" className={classes.title}>
				User Data
			</Typography>
			<Typography className={classes.subtitle}>
				Feel free to change your user data here.
			</Typography>
			<TextField
				required
				fullWidth
				variant="outlined"
				placeholder="Username"
				className={classes.textField}
				disabled={loading}
				value={values.username}
				onChange={(e) => setValues({ ...values, username: e.target.value })}
			/>
			<TextField
				required
				fullWidth
				variant="outlined"
				placeholder="Email"
				className={classes.textField}
				disabled={loading}
				value={values.email}
				onChange={(e) => setValues({ ...values, email: e.target.value })}
			/>
			<Button
				variant="outlined"
				fullWidth
				disabled={loading}
				className={classes.button}
				onClick={onUpdateUserData}
			>
				Update Data
			</Button>
		</Grid>
	);
}

Settings.propTypes = {
	user: PropTypes.any.isRequired,
	setUserData: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};
