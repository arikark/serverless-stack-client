import React, { useRef, useState, memo } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../Common/LoaderButton";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import "./NewNote.css";
import { s3Upload } from "../../libs/awsLib";
import { postNote } from "../../libs/apiLib";
import { useToggle } from "../../libs/hooksLib";
import CreateNewNoteButton from "../Common/CreateNewNoteButton";


function NewNote({ setNotes }) {
	const [isCreateNewNote, toggleCreateNewNote] = useToggle();
	const file = useRef(null);
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	// New note is rendering 3 times everytime you click submit. How can this be fixed?

	function validateForm() {
		return content.length > 0;
	}

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
			setNotes(notes => [...notes, res]);
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
				<LoaderButton
					block
					type="submit"
					size="lg"
					variant="primary"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Create
        </LoaderButton>
			</Form>)}
		</div>
  );
}

export default memo(NewNote)