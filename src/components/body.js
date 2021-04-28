import React from "react";
import {Route, Switch} from "react-router-dom";

import AboutMe from "./aboutMe";
import Post from "./post";
// import Blog from "./blog";
import Blog from "./blog2";



export default function Body() {
    return (
        <Switch>
            <Route path="/aboutMe" exact component={AboutMe}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/post/:slug" component={Post}/>
            <Route path="/" component={AboutMe}/>
        </Switch>
    )
}