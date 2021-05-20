import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import {createMuiTheme, Typography, ThemeProvider} from "@material-ui/core";


const options = {
    overrides: {
        h1: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "h3",
                align: "center"
            },
        },
        h2: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "h4",
                align: "center"
            },
        },
        h3: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "h5",
            },
        },
        h4: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "caption",
                paragraph: true
            },
        },
        h5: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "subtitle1",
                paragraph: true,
                color: "textSecondary"
            },
        },
        p: {
            component: Typography,
            props: {
                paragraph: true
            },
        }
    }
}

const theme = createMuiTheme({
    typography: {
        fontFamily: 'DejaVu Sans Mono, monospace',
    }
})


export default function Markdown(props) {
    return (
        <ThemeProvider theme={theme}>
            <ReactMarkdown options={options} {...props}/>
        </ThemeProvider>
    )
}