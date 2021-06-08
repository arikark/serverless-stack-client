import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./App.css";
import Home from "./containers/Home";
import AppNavbar from './containers/AppNavbar.js';
import Routes from "./Routes";


import { AppContext } from "./libs/contextLib";

function App() {
	const history = useHistory();
	const [isAuthenticated, userHasAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	return (
		<div className="App container py-3">
			<AppContext.Provider value={{
				isAuthenticated,
				userHasAuthenticated,
				user,
				setUser
			}}>
				<AppNavbar />
				<Routes>
					<Home />
				</Routes>
			</AppContext.Provider>
		</div>
	)
}

export default App;