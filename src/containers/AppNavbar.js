import React from "react";
import { useAppContext } from "../libs/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState } from '@aws-amplify/ui-components';
import { useHistory } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function AppNavbar() {
	const history = useHistory();
	const { isAuthenticated, userHasAuthenticated } = useAppContext();
	const handleSignOut = () => {
		userHasAuthenticated(AuthState.SignedOut)
		history.push("/")
	}
	return (
		<div className="App container py-3">
			<Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
				<LinkContainer to="/">
					<Navbar.Brand className="font-weight-bold text-muted">
						Scratch
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Nav activeKey={window.location.pathname}>
						{isAuthenticated === AuthState.SignedIn &&
							window.location.pathname !== "./containers/todoapp" ? (
							<AmplifySignOut
								handleAuthStateChange={handleSignOut}
							/>
							) : (
							<LinkContainer to="/notes">
								<Nav.Link>Notes</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	)
}


