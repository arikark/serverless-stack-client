import React, { useState, useEffect } from "react";
import { useUserContext } from "../../libs/contextLib";
import NewNote from './NewNote'
import { onError } from "../../libs/errorLib";
import { getNotes, deleteNote, updateNote } from "../../libs/apiLib";
import Note from "./Note"

import Login from "../Common/Login"
// import { onError } from "../libs/errorLib";
import { AuthState } from '@aws-amplify/ui-components';
import ListGroup from "react-bootstrap/ListGroup";
import {  } from "../../libs/apiLib";


export default function Notes() {
	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState(null);
	const { user, authState } = useUserContext(null);

	async function handleUpdate(updatedNoteId, content) {
		try {
			console.log(`handleupdate: ${content}`)
			const res = await updateNote(updatedNoteId, content);
			console.log(res)
			setNotes(notes.map(note => note.noteId === updatedNoteId ? { ...note, content } : note));
		} catch (e) {
			onError(e)
		}
	}

	async function handleDelete(deletedNoteId) {
		try {
			await deleteNote(deletedNoteId);
			setNotes(notes.filter(note => note.noteId !== deletedNoteId));
		} catch (e) {
			onError(e)
		}
	}

	useEffect(() => {
		async function onLoad() {
			if (authState !== AuthState.SignedIn) {
				console.log("Notes List On Effect - not auth")
				return;
			}
			try {
				console.log("Notes List On Effect - get from db")
				const notesFromDB = await getNotes();
				setNotes(notesFromDB);
			} catch (e) {
				onError(e);
			}
			setIsLoading(false);
		}
		onLoad();
	}, [authState]);

	function renderNotesList(notes) {
		console.log("renderNotesList")
		const orderedNotes = notes.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
		return (
			 <ListGroup>
				{orderedNotes.map((note) => (
					<Note {...note}
						handleDelete={handleDelete}
						handleUpdate={handleUpdate}
						key={note.noteId} />
				))}
			 </ListGroup>
		);
	}

  return authState === AuthState.SignedIn && user ? (
		<div className="Notes container">
			<div>Hello, {user.username}</div>
				<div className="notes">
				<h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
			</div>
				<NewNote setNotes={setNotes} />
			{!isLoading && renderNotesList(notes)}
		</div>
	) : (
			<Login />
  );
}
