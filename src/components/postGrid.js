import {makeStyles, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, CardActions, Button} from "@material-ui/core";
import {Link} from "react-router-dom"


const useStyles = makeStyles(() => ({
    card: {
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    cardActionArea: {
        flexDirection: "column",
        alignItems: 'flex-start',
        height: "88%",
    },
    cardActions: {
    },
    media: {
        height: 240
    },
    button: {
    }
}))


export default function PostGrid(props) {
    
    const {postData} = props;
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
                    {/* <Link to={"/post/" + postData.slug}> */}
                        <CardMedia
                            className={classes.media}
                            image={postData.imageUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {postData.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {postData.descriptions}
                            </Typography>
                        </CardContent>
                    {/* </Link> */}
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Button className={classes.button} variant="outlined" to={"/post/" + postData.slug} component={Link}>
                        Read more
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
