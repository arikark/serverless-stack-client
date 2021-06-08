import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useToggle } from "../libs/hooksLib";
import NewNote from './NewNote'
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
// import { loadNotes } from "../libs/awsLib";
import CreateNewNoteButton from "../components/CreateNewNoteButton";
import { API } from "aws-amplify";
import "./Home.css";

export default function NotesList() {
	const [isCreateNewNote, toggleCreateNewNote] = useToggle();
  const { isAuthenticated, notes, setNotes } = useAppContext();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function onLoad() {
			if (!isAuthenticated) {
				return;
			}
			try {
				const notesFromDB = await loadNotes();
				setNotes(notesFromDB);
				console.log("render")
			} catch (e) {
				onError(e);
			}
			setIsLoading(false);
		}
		onLoad();
		// I dont get why setNotes has to be here
	}, [isAuthenticated, setNotes]);

	function loadNotes() {
		return API.get("notes", "/notes");
	}

	function renderNotesList(notes) {
		return (
			<>
				<CreateNewNoteButton onClick={toggleCreateNewNote} />
				{isCreateNewNote && <NewNote updateNotes={setNotes} loadNotes={loadNotes}/>}
				{notes.map(({ noteId, content, createdAt }) => (
					<ListGroup.Item action key={noteId} >
						<span className="font-weight-bold">
							{content.trim().split("\n")[0]}
						</span>
						<br />
						<span className="text-muted">
							Created: {new Date(createdAt).toLocaleString()}
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
      {isAuthenticated && renderNotes()}
    </div>
  );
}