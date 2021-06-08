import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Login.css";
import {
	AmplifySignIn,
	AmplifySignUp,
	AmplifyAuthenticator,
	AmplifyConfirmSignUp
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

export default function Login() {
  const history = useHistory();
	const { userHasAuthenticated, setUser, user } = useAppContext();

	onAuthUIStateChange((nextAuthState, authData) => {
		userHasAuthenticated(nextAuthState);
		setUser(authData)
	});

	const handleAuthStateChange = (nextAuthState, authData) => {
		userHasAuthenticated(nextAuthState);
		setUser(authData)
	};

  return (
			<AmplifyAuthenticator>
				<AmplifySignIn
					headerText="My Custom Sign In Text"
					slot="sign-in"
					// handleAuthStateChange={handleAuthStateChange}
				></AmplifySignIn>
				<AmplifySignUp
					headerText="My Custom Sign Up Text"
					slot="sign-up"
				></AmplifySignUp>
				<AmplifyConfirmSignUp
					headerText="My CustomA Confirm Sign Up Text"
					slot="confirm-sign-up"
					user={user}
			></AmplifyConfirmSignUp>
			</AmplifyAuthenticator>
  );
}