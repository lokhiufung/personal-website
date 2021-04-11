import {React, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {makeStyles, Container} from "@material-ui/core"

import Markdown from "./markdown"
import {postsData} from "../constants";


const finPostBySlug = (slug) => {
    return postsData.find(postData => postData.slug === slug)
}

const useStyles = makeStyles(() => ({
    root: {
        padding: "120px",
    }
}))


export default function Post() {
    const [state, setState] = useState({
        post: "",
    });

    const classes = useStyles();
    
    var {slug} = useParams();
    const postData = finPostBySlug(slug);
    
    useEffect(() => {
        fetch(postData.path).then((response) => response.text()).then((text) => setState({post: text}))
    }, [])

    return (
        <Container maxWidth="md">
            <div className={classes.root}>
                <Markdown>
                    {state.post}        
                </Markdown>
            </div>
        </Container>
    )
}