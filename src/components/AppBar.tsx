import React, { useState, useContext } from "react";
import PropTypes, { InferProps } from "prop-types";
import { navigate } from "@reach/router";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import { Web3Context } from "../context/Web3Context";

interface MenuType {
	name: string;
	title: string;
	icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	mainContent: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: theme.spacing(12),
	},
	routerContainer: {
		width: "100%",
	},
}));

export default function CustomAppBar(
	props: InferProps<typeof CustomAppBar.propTypes>,
): JSX.Element {
	const { menu: menuList, onLogout } = props;
	const classes = useStyles();
	const theme = useTheme();
	const { web3Accounts, web3ChainId } = useContext(Web3Context);
	const [open, setOpen] = useState(false);

	return (
		<>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(!open)}
						edge="start"
						className={classes.menuButton}
					>
						{open ? <CloseIcon /> : <MenuIcon />}
					</IconButton>
					<Typography variant="h6" noWrap className={classes.title}>
						Dashboard
					</Typography>

					<Typography>
						{web3ChainId && `${web3ChainId} Network`}
						{web3Accounts.length > 0 && `(${web3Accounts[0]})`}
					</Typography>
					<Button color="inherit" variant="outlined" onClick={onLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={() => setOpen(false)}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{menuList?.top.map((menu: MenuType) => {
						const { name, title, icon: Icon } = menu;
						return (
							<ListItem
								button
								key={name}
								onClick={() => navigate(`/${name}`)}
								selected={location.pathname === `/${name}`}
							>
								<ListItemIcon>
									<Icon />
								</ListItemIcon>
								<ListItemText primary={title} />
							</ListItem>
						);
					})}
				</List>
				<Divider />
				<List>
					{menuList.bottom.map((menu: MenuType) => {
						const { name, title, icon: Icon } = menu;
						return (
							<ListItem
								button
								key={name}
								onClick={() => navigate(`/${name}`)}
								selected={location.pathname === `/${name}`}
							>
								<ListItemIcon>
									<Icon />
								</ListItemIcon>
								<ListItemText primary={title} />
							</ListItem>
						);
					})}
				</List>
			</Drawer>
		</>
	);
}

CustomAppBar.propTypes = {
	menu: PropTypes.shape({
		top: PropTypes.array.isRequired,
		bottom: PropTypes.array.isRequired,
	}).isRequired,
	onLogout: PropTypes.func.isRequired,
};
