import React from "react";
import { useAppContext } from "../libs/contextLib";
// import { useHistory } from "react-router-dom";
import './TodoApp.css';

import Login from "./Login"
// import { onError } from "../libs/errorLib";
import { AuthState } from '@aws-amplify/ui-components';

function TodoApp() {
	const {
		isAuthenticated,
		user
	} = useAppContext();

  return isAuthenticated === AuthState.SignedIn && user ? (
		<div className="TodoApp">
			<div>Hello, {user.username}</div>
		</div>
	) : (
			<Login />
  );
}

export default TodoApp;