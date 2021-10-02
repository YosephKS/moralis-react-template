import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useSnackbar } from "notistack";
import { Router, navigate, useLocation } from "@reach/router";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Dashboard from "./Dashboard";

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: "2rem",
	},
	title: {
		flexGrow: 1,
	},
	mainContent: {
		padding: "3rem",
	},
}));

const Index = () => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { user, logout } = useMoralis();
	const location = useLocation();

	const onLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (e) {
			enqueueSnackbar("Logout Failed.", { variant: "error" });
		}
	};

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/dashboard");
		}
	}, [location.pathname]);

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Dashboard
					</Typography>
					<Button color="inherit" onClick={onLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<main className={classes.mainContent}>
				<Router>
					<Dashboard path="dashboard" user={user} />
				</Router>
			</main>
		</>
	);
};

export default Index;
