import React, { useState, useEffect, useReducer } from "react";

import { useUserContext } from "../../libs/contextLib";
import { getNotes } from "../../libs/api/notesApi";
import { onError } from "../../libs/errorLib";
import notesReducer from "../../libs/reducers/notesReducer";
import { AuthState } from '@aws-amplify/ui-components';

import NewNote from './NewNote'
import Note from "./Note"
import Login from "../Common/Login"

import ListGroup from "react-bootstrap/ListGroup";

export default function Notes() {
	const [isLoading, setIsLoading] = useState(true);
	const [notes, dispatch] = useReducer(notesReducer);
	const { user, authState } = useUserContext();

	// Is this the best way to initialise our state? Or should it be initialised by lazy init function?
	useEffect(() => {
		async function onLoad() {
			if (authState !== AuthState.SignedIn) {
				console.log("Notes List On Effect - not auth")
				return;
			}
			try {
				console.log("Notes List On Effect - get from db")
				// can we add the getNotes function to the reducer's dispatch?
				const notesFromDB = await getNotes();
				dispatch({ type: "INIT", notesFromDB })
			} catch (e) {
				onError(e);
			}
			setIsLoading(false);
		}
		onLoad();
	}, [authState]);

	function renderNotesList() {
		console.log("renderNotesList")
		const orderedNotes = notes?.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
		return (
			 <ListGroup>
				{orderedNotes.map((note) => (
					<Note {...note}
						dispatch={dispatch}
						key={note.noteId} />
				))}
			 </ListGroup>
		);
	}

  return authState === AuthState.SignedIn && user ? (
		<div className="Notes container">
			<div>Hello, {user.username}</div>
				<div className="notes">
				<h2 className="pb-3action.res mt-4 mb-3 border-bottom">Your Notes</h2>
			</div>
			<NewNote dispatch={dispatch} />
			{!isLoading && renderNotesList()}
		</div>
	) : (
			<Login />
  );
}
