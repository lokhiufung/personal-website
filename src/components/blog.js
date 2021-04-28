import {React} from "react";
import {Link} from "react-router-dom"
import {Typography, Box, Grid, Container, Card, CardMedia, CardContent, CardActions, CardActionArea, Button, makeStyles} from "@material-ui/core";

import Header from "./header"

import {POSTSDATA, BLOG_TITLE_MAX_LENGTH} from "../constants";


const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: `url('https://images.unsplash.com/photo-1511376777868-611b54f68947?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')`,
        height: "300px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
    },
    blogContainer: {
        paddingTop: theme.spacing(5),
    },
    blogTitle: {
        fontWeight: 600,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    cardActions: {
        display: "flex",
        // margin: "0 10px",
        // justifyContent: "space-between",
    },
    media: {
        height: 240
    },
    button: {
    }
}))


export default function Blog() {
    const classes = useStyles();

    // const stripTitle = (title) => {
    //     if (title.length > BLOG_TITLE_MAX_LENGTH) {
    //         return title.slice(0, BLOG_TITLE_MAX_LENGTH) + `...`
    //     } else {
    //         return title
    //     }
    // }

    return (
        <div className="blog">
            <Header />
            <Box className={classes.hero}>
                <Box>Blog</Box> 
            </Box>
            <Container maxWidth="lg" className={classes.blogContainer}>
                <Typography variant="h4" className={classes.blogTitle}>
                    Posts
                </Typography>
                <Grid container spacing={3}>
                    {POSTSDATA.filter(postData => {return postData.isReady}).map(postData => {
                        return (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
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
                    })}
                </Grid>
            </Container>       
        </div>
    )
}