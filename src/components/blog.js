import {React} from "react";
import {Typography, GridList, GridListTile, Card, CardHeader, CardActions, Button, makeStyles} from "@material-ui/core";

import {postsData} from "../constants";


const useStyles = makeStyles(() => ({
    root: {
        padding: "120px"
    },
    gridList: {
        width: 500,
        height: 450,
    },
}))


export default function Blog() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3" gutterButtom>
                Blog
            </Typography>
            <GridList className={classes.gridList} cols={3} spacing={30}>
                {postsData.map(postData => (
                    <GridListTile cols={1}>
                        <Card>
                            <CardHeader title={postData.title}/>
                            <CardActions>
                                <Button size="small" color="primary" variant="outlined">
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