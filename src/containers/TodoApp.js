import React from "react";
import { useUserContext } from "../libs/contextLib";
import NotesList from './NotesList'
import NewNote from "./NewNote"

// import { useHistory } from "react-router-dom";
import './TodoApp.css';

import Login from "./Login"
// import { onError } from "../libs/errorLib";
import { AuthState } from '@aws-amplify/ui-components';

export default function TodoApp() {
	const { user, authState } = useUserContext();
  return authState === AuthState.SignedIn && user ? (
		<div className="TodoApp container">
			<div>Hello, {user.username}</div>
			<NotesList />
		</div>
	) : (
			<Login />
  );
}
