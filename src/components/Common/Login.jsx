import React from "react";
import { useUserContext } from "../../libs/contextLib";
import "./Login.css";
import {
	AmplifySignIn,
	AmplifySignUp,
	AmplifyAuthenticator,
	AmplifyConfirmSignUp,
	AmplifyContainer
} from "@aws-amplify/ui-react";
import { onAuthUIStateChange } from '@aws-amplify/ui-components';

export default function Login() {
	const { setUser, user, setAuthState } = useUserContext();
	onAuthUIStateChange((nextAuthState, authData) => {
		setAuthState(nextAuthState);
		setUser(authData)
	});

	return (
		<div className="auth">
			<AmplifyContainer>
				<AmplifyAuthenticator>
					<AmplifySignIn
						headerText="My Custom Sign In Text"
						slot="sign-in"
						validationErrors
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
			</AmplifyContainer>
		</div>

  );
}