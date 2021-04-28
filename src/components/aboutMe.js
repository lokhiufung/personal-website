import {React, useEffect, useState} from "react";
import {Container, makeStyles} from "@material-ui/core";

import Header from "./header"

import aboutMe from "../posts/about-me.md"
import Markdown from "./markdown";


const useStyles = makeStyles((theme) => ({
    aboutMeContainer: {
        paddingTop: theme.spacing(10),
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
        <div className="aboutMe">
            <Header/>
            <Container maxWidth="md" className={classes.aboutMeContainer}>
                <Markdown>
                    {state.post}
                </Markdown>
            </Container>
        </div>
        
    )
}