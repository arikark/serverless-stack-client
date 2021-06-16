import React from "react";

// import Layout from "./layouts/Layout";
import AppNavbar from './components/AppNavbar/AppNavbar';
import Routes from "./Routes";
import { AppProvider } from "./libs/contextLib";

export default function App() {
	return (
		// <Layout>
			<AppProvider>
				<AppNavbar />
				<Routes />
			</AppProvider>
		// </Layout>
	)
}