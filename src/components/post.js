import {React, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {makeStyles, Container} from "@material-ui/core"

import Header from "./header"

import Markdown from "./markdown"
import {POSTSDATA} from "../constants";


const finPostBySlug = (slug) => {
    return POSTSDATA.find(postData => postData.slug === slug)
}

const useStyles = makeStyles((theme) => ({
    postContainer: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10)
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
        <div className="post">
            <Header />
            <Container maxWidth="md" className={classes.postContainer}>
                <Markdown>
                    {state.post}        
                </Markdown>
            </Container>
        </div>
        
    )
}