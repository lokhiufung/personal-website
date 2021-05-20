import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {ThemeProvider, createMuiTheme} from "@material-ui/core"
import {red, green} from "@material-ui/core/colors"

import AboutMe from "./aboutMe";
import Post from "./post";
import Blog from "./blog";
import {BASE_NAME} from "../constants"


const theme = createMuiTheme({
    palette: {
        primary: {
            // main: "#1f09e0",
            main: "#18181a",
        },
    },
    background: {
        default: "#fff"
    }
});


export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter basename={BASE_NAME}>
                <Switch>
                    <Route path="/aboutMe" exact component={AboutMe}/>
                    <Route path="/post/:slug" component={Post}/>
                    <Route path="/blog" component={Blog}/>
                    <Route path="/" component={AboutMe}/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};
