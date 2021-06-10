import React from "react";
import { Route, Switch } from "react-router-dom";
import Notes from './components/Notes/Notes.js';
import Landing from "./components/Landing/Landing";
import NotFound from "./components/Common/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
			</Route>
			<Route exact path="/notes">
				<Notes />
			</Route>
			{/* Finally, catch all unmatched routes */}
			<Route>
				<NotFound />
			</Route>
    </Switch>
  );
}