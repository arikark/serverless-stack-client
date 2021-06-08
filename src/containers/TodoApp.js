import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import './TodoApp.css';

import Login from "./Login"
import Routes from "../Routes";
import { AppContext } from "../libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "../libs/errorLib";
import {
  AmplifyAuthContainer,
	AmplifyAuthenticator,
	AmplifySignIn
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

function TodoApp() {
	const history = useHistory();
	const {
		isAuthenticated,
		user,
		userHasAuthenticated,
		setUser
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