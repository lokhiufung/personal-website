import {React} from "react";
import {Link} from "react-router-dom"
import {Typography, GridList, GridListTile, Card, CardHeader, CardActions, Button, makeStyles} from "@material-ui/core";

import {postsData} from "../constants";


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
        justifyContent: "left"
    },
    // cardHeader: {
    //     fontSize: 1,
    // },
    gridListTile: {
        justifyContent: "center",
        // borderBottom: "1px solid black"
    }
}))


export default function Blog() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3" gutterButtom className={classes.blogHeader}>
                Blog
            </Typography>
            <GridList className={classes.gridList} cols={3} spacing={30}>
                {postsData.map(postData => (
                    <GridListTile cols={1} className={classes.gridListTile}>
                        <Card>
                            <CardHeader title={
                                <Typography gutterBottom variant="h5" component="h2">
                                    {postData.title}
                                </Typography>
                            }/>
                            
                            <CardActions>
                                <Button size="small" color="primary" variant="outlined" to={"/post/" + postData.slug} component={Link}>
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