import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useToggle } from "../libs/hooksLib";
import NewNote from './NewNote'
import { useUserContext, useNotesContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
// import { loadNotes } from "../libs/awsLib";
import CreateNewNoteButton from "../components/CreateNewNoteButton";
import { API } from "aws-amplify";
import { getNotes } from "../libs/apiLib";
import "./Home.css";

export default function NotesList() {
	const [isCreateNewNote, toggleCreateNewNote] = useToggle();
	const [isLoading, setIsLoading] = useState(true);
	const { authState, user } = useUserContext();
	const { notes, setNotes } = useNotesContext();

	useEffect(() => {
		async function onLoad() {
			if (!user) {
				return;
			}
			try {
				const notesFromDB = await getNotes();
				setNotes(notesFromDB);
				console.log("render 1")
			} catch (e) {
				onError(e);
			}
			setIsLoading(false);
		}
		onLoad();
		// I dont get why setNotes has to be here
	}, [authState]);

	// 	useEffect(() => {
	// 	async function onLoad() {
	// 		if (!user) {
	// 			return;
	// 		}
	// 		try {
	// 			console.log("render notes")
	// 		} catch (e) {
	// 			onError(e);
	// 		}
	// 		setIsLoading(false);
	// 	}
	// 	onLoad();
	// 	// I dont get why setNotes has to be here
	// }, [notes]);

	function loadNotes() {
		return API.get("notes", "/notes");
	}

	function renderNotesList(notes) {
		return (
			<>
				<CreateNewNoteButton onClick={toggleCreateNewNote} />
				{isCreateNewNote && <NewNote />}
				{notes.map(({ noteId, content, createdAt }) => (
					<ListGroup.Item action key={noteId} >
						<span className="font-weight-bold">
							{content.trim().split("\n")[0]}
						</span>
						<br />
						<span className="text-muted">
							Created: {createdAt}
						</span>
					</ListGroup.Item>
				))}
			</>
		);
	}

  // function renderLander() {
  //   return (
  //     <div className="lander">
  //       <h1>Scratch</h1>
  //       <p className="text-muted">A simple note taking app</p>
  //     </div>
  //   );
  // }

  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="ListNotes">
      {user && renderNotes()}
    </div>
  );
}