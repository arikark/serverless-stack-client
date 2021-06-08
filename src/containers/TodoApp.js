import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import './TodoApp.css';
import Routes from "../Routes";
import { AppContext } from "../libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "../libs/errorLib";
import {
  AmplifyAuthContainer,
	AmplifyAuthenticator,
	AmplifySignOut
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

function TodoApp() {
	const history = useHistory();
	const {
		isAuthenticated,
		userHasAuthenticated,
		user,
		setUser
	} = useAppContext();

	React.useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			userHasAuthenticated(nextAuthState);
			setUser(authData)
		});
	}, []);

  return isAuthenticated === AuthState.SignedIn && user ? (
		<div className="TodoApp">
			<div>Hello, {user.attributes.email}</div>
		</div>
			) : (
		<AmplifyAuthContainer>
			<AmplifyAuthenticator />
		</AmplifyAuthContainer>
  );
}

export default TodoApp;