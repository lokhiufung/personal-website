import React from "react";
import {BrowserRouter, Route} from "react-router-dom"
import {makeStyles, ThemeProvider, createMuiTheme} from "@material-ui/core"
import {red, green} from "@material-ui/core/colors"

import Header from "./header";
import Body from "./body";
// import Footer from "./footer";

const useStyles = makeStyles(() => ({
    header: {
        marginBottom: "auto",
    },
    body: {
        padding: "120px",
    },
}))


const theme = createMuiTheme({
    palette: {
        primiary: red,
        secondary: green
    }
});


export default function App() {
    const {body} = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <React.Fragment className="App">
                    <Header/>
                    <Body className={body}/>
                </React.Fragment>
            </BrowserRouter>
        </ThemeProvider>
    );
};
