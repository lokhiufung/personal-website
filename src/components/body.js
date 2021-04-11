import React from "react";
import {Route, Switch} from "react-router-dom";

import AboutMe from "./aboutMe";
import Post from "./post";
import Blog from "./blog";



export default function Body() {
    return (
        <Switch>
            <Route path="/aboutMe" exact component={AboutMe}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/post/:slug" component={Post}/>
        </Switch>
    )
}