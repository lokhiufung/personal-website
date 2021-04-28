import {React} from "react";
import {Link} from "react-router-dom"
import {Typography, Box, Grid, Container, Card, CardHeader, CardContent, CardActions, Button, makeStyles} from "@material-ui/core";

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
            
        </div>
    )
}