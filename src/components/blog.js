import {React} from "react";
import {Link} from "react-router-dom"
import {Typography, GridList, GridListTile, Card, CardHeader, CardContent, CardActions, Button, makeStyles} from "@material-ui/core";

import {POSTSDATA, BLOG_TITLE_MAX_LENGTH} from "../constants";


const useStyles = makeStyles(() => ({
    root: {
        padding: "10%"
    },
    blogHeader: {
        textAlign: "center",
        justifyContent: "center",
        // marginBottom: "20px"
    },
    gridList: {
        justifyContent: "left",
    },
    // cardHeader: {
    //     fontSize: 1,
    // },
    gridListTile: {
        justifyContent: "center",
        // width: 500,
        height: "100%",
        // display: "inline-flex"
        // borderBottom: "1px solid black"
    },
    cardRoot: {
        // height: "100%",
        height: 500,
        width: 450

    },
    cardAction: {
        bottom: 0,
    }
}))


export default function Blog() {
    const classes = useStyles();

    const stripTitle = (title) => {
        if (title.length > BLOG_TITLE_MAX_LENGTH) {
            return title.slice(0, BLOG_TITLE_MAX_LENGTH) + `...`
        } else {
            return title
        }
    }
    return (
        <div className={classes.root}>
            <Typography variant="h3" gutterButtom className={classes.blogHeader}>
                Blog
            </Typography>
            <GridList className={classes.gridList} cols={2} spacing={30}>
                {POSTSDATA.map(postData => (
                    <GridListTile cols={1} className={classes.gridListTile}>
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <Typography className={classes.cardTitle} gutterBottom>
                                    {postData.title}
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {postData.descriptions}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button className={classes.cardAction} size="small" color="primary" variant="outlined" to={"/post/" + postData.slug} component={Link}>
                                    Read More
                                </Button>
                            </CardActions>
                        </Card>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}