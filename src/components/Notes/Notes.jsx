import React, { useState, useEffect } from "react";

import { useUserContext } from "../../contexts/UserContext";
import { useNotesContext } from "../../contexts/NotesContext";
import { useNotesDispatchContext } from "../../contexts/NotesContext";

import { getNotes } from "../../api/notesApi";
import { onError } from "../../libs/errorLib";
import { AuthState } from '@aws-amplify/ui-components';

import NewNote from './NewNote'
import Note from "./Note"
import Login from "../Login/Login"

import ListGroup from "react-bootstrap/ListGroup";

export default function Notes() {
	const { user, authState } = useUserContext();
	const [ isLoading, setIsLoading ] = useState(true);
	const notes = useNotesContext();
	const notesDispatch = useNotesDispatchContext();

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
				notesDispatch({ type: "INIT", notesFromDB })
			} catch (e) {
				onError(e);
			}
			setIsLoading(false);
		}
		onLoad();
	}, [authState, notesDispatch]);

	function renderNotesList() {
		console.log("renderNotesList")
		const orderedNotes = notes?.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
		return (
			<ListGroup className='my-2'>
				{orderedNotes.map((note) => (
					<Note {...note}
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
			<NewNote />
			{!isLoading && renderNotesList()}
		</div>
	) : (
			<Login />
  );
}
