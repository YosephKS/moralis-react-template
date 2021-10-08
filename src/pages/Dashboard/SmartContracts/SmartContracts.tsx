import React from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardList from "../../../list/smartContracts.json";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	cardContainer: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
}));

// eslint-disable-next-line
export default function Catalog(_props: RouteComponentProps): JSX.Element {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			<Typography variant="h4">Smart Contracts Catalog</Typography>
			<Typography variant="subtitle1" align="center">
				Browse through our collection of smart contracts and test them out by
				yourself.
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
}
