import React, { useState } from "react";

import "./App.css";
import AppNavbar from './containers/AppNavbar.js';
import Routes from "./Routes";

import { AppContext } from "./libs/contextLib";

function App() {
	const [isAuthenticated, userHasAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [notes, setNotes] = useState(null);

	return (
		<div className="App container py-3">
			<AppContext.Provider value={{
				isAuthenticated,
				userHasAuthenticated,
				user,
				setUser,
				notes,
				setNotes
			}}>
				<AppNavbar />
				<Routes />
			</AppContext.Provider>
		</div>
	)
}

export default App;