import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Router, navigate, useLocation } from "@reach/router";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
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
	const location = useLocation();
	const classes = useStyles();
	const { user, logout, isAuthenticated } = useMoralis();

	const onLogout = async () => {
		await logout();
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		} else if (isAuthenticated && location.pathname === "/") {
			navigate("/dashboard");
		}
	}, [isAuthenticated, location.pathname]);

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
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
