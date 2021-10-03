import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { navigate } from "@reach/router";
import CardList from "../../list/card.json";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	cardContainer: {
		marginTop: theme.spacing(3),
	},
}));

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
					const { name, title, description, link } = card;
					return (
						<Grid item xs={12} md={6} key={name}>
							<Card className={classes.root} elevation={3}>
								<CardActionArea>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{title}
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											{description.substring(0, 80)}
											{description.length >= 80 && "..."}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Button size="small" color="primary" onClick={() => navigate(link)}>
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

Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
};

export default Dashboard;
