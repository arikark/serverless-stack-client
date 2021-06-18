import React, { useRef, useState, memo } from "react";
import "./NewNote.css";
import config from "../../config";

import { useNotesDispatchContext } from "../../contexts/NotesContext";

import { onError } from "../../libs/errorLib";
import { useToggle } from "../../hooks/commonHooksLib";
import { s3Upload } from "../../api/awsApi";
import { postNote } from "../../api/notesApi";

import CreateNewNoteButton from "./CreateNewNoteButton";

import Form from "react-bootstrap/Form";

import {
	Button, Spinner
} from "react-bootstrap";

function NewNote({ dispatch }) {
	const [isCreateNewNote, toggleCreateNewNote] = useToggle();
	const file = useRef(null);
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const notesDispatch = useNotesDispatchContext();
	// New note is rendering 3 times everytime you click submit. How can this be fixed?

	function handleFileChange(event) {
		file.current = event.target.files[0];
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
			alert(
				`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000
				} MB.`
			);
			return;
		}
		setIsLoading(true);
		try {
			const attachment = file.current ? await s3Upload(file.current) : null;
			const newNote = { content, attachment }
			const res = await postNote(newNote);
			notesDispatch({ type: "ADD", newNote: res });
			setIsLoading(false);
			setContent("")
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	}

	return (
		<div className="NewNote">
			<CreateNewNoteButton onClick={toggleCreateNewNote} />
			{isCreateNewNote && (
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="content">
						<Form.Control
							value={content}
							type="text"
							placeholder="New note"
							onChange={(e) => setContent(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="file">
						<Form.Label>Attachment</Form.Label>
						<Form.Control onChange={handleFileChange} type="file" />
					</Form.Group>
					<Button block disabled={!content} variant="outline-secondary" type="submit" size="lg">
						{isLoading ?
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/> : "Create"}
					</Button>
				</Form>)}
		</div>
	);
}

export default memo(NewNote)