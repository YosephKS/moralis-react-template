import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const CardList = [
	{
		title: "Moralis",
		description:
			"The Ultimate Web3 Development Platform. Join 5,000+ blockchain projects that use Moralis software and APIs to build & scale their dApps without the cost & complexity.",
		link: "https://moralis.io/",
	},
	{
		title: "Documentation",
		description:
			'Think "Firebase of crypto". Moralis provides managed backend for blockchain projects. Automatically syncing the balances of your users into the database, allowing you to set up on-chain alerts, watch smart contract events, build indexes, and so much more. All features are accessed through an easy-to-use SDK. All features Moralis provides are cross-chain by default.',
	},
	{
		title: "React Moralis",
		description: "Hooks and components to use Moralis in a React app",
		link:
			"https://github.com/MoralisWeb3/react-moralis#update-the-user-with-setuserdata",
	},
	{
		title: "Author (GitHub)",
		description:
			"YosephKS is the author of this template. Note that this template is unofficial and independently made by third party that has no association with Moralis.",
		link: "https://github.com/YosephKS",
	},
];

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	cardContainer: {
		marginTop: "1rem",
	},
});

const Dashboard = (props) => {
	const { user } = props;
	const classes = useStyles();

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			<Typography variant="h4">Hi {user.get("username")}!</Typography>
			<Typography variant="subtitle" align="center">
				Welcome to the Moralis React App Template
			</Typography>
			<Grid container spacing={2} className={classes.cardContainer}>
				{CardList.map((card) => {
					const { title, description } = card;
					return (
						<Grid item xs={12} md={6}>
							<Card className={classes.root} elevation={3}>
								<CardActionArea>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{title}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{description.substring(0, 80)}
											{description.length >= 80 && "..."}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Button size="small" color="primary">
										Learn More
									</Button>
								</CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default Dashboard;
