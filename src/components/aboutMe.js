import {React, useEffect, useState} from "react";
import {Container, makeStyles} from "@material-ui/core";

import aboutMe from "../posts/about-me.md"
import Markdown from "./markdown";


const useStyles = makeStyles(() => ({
    root: {
        padding: "120px"
    }
}))


export default function AboutMe() {
    const [state, setState] = useState({
        post: "",
    });

    const classes = useStyles();

    useEffect(() => {
        fetch(aboutMe).then((response) => response.text()).then((text) => setState({post: text}))
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