import {React, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {makeStyles, Container, Grid, Typography} from "@material-ui/core"

import Header from "./header"
import PostGrid from "./postGrid";
import Markdown from "./markdown"
import {POSTSDATA} from "../constants";


const findPostBySlug = (slug) => {
    return POSTSDATA.find(postData => postData.slug === slug)
}


const findPostsWithTags = (tags, currentSlug) => {
    return POSTSDATA.filter(postData => {
        if (currentSlug === postData.slug) {
            // if it is the same post, filter it
            return false;
        } else {
            const intersection = tags.filter(tag => postData.tags.includes(tag));
            if (intersection.length > 0) {
                return true;
            } else {
                return false;
            };
        }
    }); 
}


const useStyles = makeStyles((theme) => ({
    postContainer: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10)
    },
    footerTitle: {
        // paddingTop: theme.spacing(3),
        // paddingBottom: theme.spacing(3),
        fontWeight: 600,
    }
}))


export default function Post() {
    const [state, setState] = useState({
        post: "",
    });

    const classes = useStyles();

    var {slug} = useParams();
    const postData = findPostBySlug(slug);
    const relatedPostData = findPostsWithTags(postData.tags, slug);

    // reminder: useEffect will be triggered after slug changes; https://stackoverflow.com/questions/58015602/how-to-rerender-component-in-useeffect-hook
    useEffect(() => {
        fetch(postData.path).then((response) => response.text()).then((text) => setState({post: text}))
    }, [slug])

    return (
        <div className="post">
            <Header />
            <Container maxWidth="md" className={classes.postContainer}>
                <Markdown>
                    {state.post}        
                </Markdown>
            </Container>
            {/* <Divider /> */}
            <Container maxWidth="md">
                <Typography variant="h4">
                    See also
                </Typography>
                <Grid container spacing={3}>
                    {relatedPostData.map(postData => {
                        return (
                            <PostGrid postData={postData}/>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}