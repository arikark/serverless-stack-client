import React from "react";
import { AppProvider } from "../libs/contextLib";

export default function Layout(props) {
	return (
		<React.Fragment>
			{props.childeren}
		</React.Fragment>
	)
}