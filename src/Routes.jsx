import React from "react";
import { Route, Switch } from "react-router-dom";

import AppNavbar from "./components/AppNavbar/AppNavbar";
import Notes from './components/Notes/Notes';
import Landing from "./components/Landing/Landing";
import NotFound from "./components/Common/NotFound";

import { UserContextProvider } from "./contexts/UserContext";
import { NotesContextProvider } from "./contexts/NotesContext";

export default function Routes() {
	return (
		<UserContextProvider>
			<AppNavbar />
			<Switch>
				<Route exact path="/">
					<Landing />
				</Route>
				<Route exact path="/notes">
					<NotesContextProvider>
						<Notes />
					</NotesContextProvider>
					</Route>
					<Route>
						<NotFound />
					</Route>
			</Switch>
		</UserContextProvider>
  );
}