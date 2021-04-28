// reference: https://betterprogramming.pub/building-a-basic-header-with-materialui-and-react-js-d650f75b4b0

import {makeStyles, AppBar, Toolbar, Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom"
import React from "react"


const headersData = [
	{
		label: "About me",
		href: "/aboutMe"
	},
	{
		label: "Blog",
		href: "/blog"
	},
	// {
	// 	label: "contact",
	// 	href: "/contact"
	// }
];


const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: "primary",
		paddingRight: "79px",
		paddingLeft: "118px",
	},
	logo: {
		frontFamily: "Work Sans, sans-serif",
		fontWeight: 600,
		color: "#FFFEFE",
		textAlign: "left",
	},
	menuButton: {
		fontFamily: "Open Sans, sans-serif",
		fontWeight: 700,
		size: "18px",
		marginLeft: "38px",
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
	},
}));


export default function Header() {
	const classes = useStyles();

	const displayDesktop = () => {
		return (
			<Toolbar className={classes.toolbar}>
				{myLogo}
				{getMenuButtons()}
			</Toolbar>
		)
	};
	
	const myLogo = (
		<Typography variant="h6" component="h1" className={classes.logo}>
			Hiu Fung Lok
		</Typography>
	);

	const getMenuButtons = () => {
		return headersData.map(({label, href}) => {
			return (
				<Button {...{key: label, color: "inherit", to: href, component: Link, className: classes.menuButton}}>
					{label}
				</Button>
			);
		});
	};

  	return (
    	<header className="header">
     		<AppBar className={classes.header}>{displayDesktop()}</AppBar>
    	</header>
  );
}