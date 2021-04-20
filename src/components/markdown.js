import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@material-ui/core/Typography";


const options = {
    overrides: {
        h1: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "h3",
            },
        },
        h2: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "h4",
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
        p: {
            component: Typography,
            props: {
                paragraph: true
            },
        }
    }
}
export default function Markdown(props) {
    return (
        <ReactMarkdown options={options} {...props}/>
    )
}