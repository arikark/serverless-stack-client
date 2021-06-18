import React, { useState } from "react";

import { useToggle } from "../../hooks/commonHooksLib";
import { onError } from "../../libs/errorLib";
import { deleteNote, updateNote } from "../../api/notesApi";

import { useNotesDispatchContext } from "../../contexts/NotesContext";

import SpinnerButton from "../Common/SpinnerButton";

import {
	ListGroup, ButtonToolbar, ButtonGroup, Button,
	InputGroup, FormControl, Col, Row, Container
} from "react-bootstrap";

export default function Note({ noteId, content, createdAt, dispatch }) {
	const notesDispatch = useNotesDispatchContext();
	const [isEdit, setEdit] = useToggle(true)
	const [isLoading, setIsLoading] = useState(false);
	const displayContent = content?.trim().split("\n")[0];
	const [formContent, setFormContent] = useState(displayContent);

	const handleEdit = async () => {
		try {
			if (formContent === content) {
				setEdit(false)
				return;
			}
			setIsLoading(true)
			console.log(`handleupdate: ${content}`)
			await updateNote(noteId, formContent);
			notesDispatch({type: "EDIT", noteId, formContent })
		} catch (e) {
			onError(e)
		}
		setEdit(false)
		setIsLoading(false)
	}

	const handleDelete = async () => {
		setIsLoading(true)
		try {
			await deleteNote(noteId);
			notesDispatch({type: "DELETE", noteId })
		} catch (e) {
			onError(e)
		}
	}

	const renderButtonGroup = () => {
		return (
			<ButtonGroup aria-label="edit and delete">
				{isEdit ?
					<Button variant="outline-secondary" onClick={setEdit}>Edit</Button> :
					<Button variant="outline-secondary" disabled={!formContent} onClick={handleEdit}>Update
					</Button>
				}
				<Button variant="outline-secondary" onClick={handleDelete}>Delete
				</Button>
			</ButtonGroup>
		)
	}

	const renderEditInput = () => {
		return(
			<InputGroup className="mb-3">
				<FormControl
					type="text"
					value={formContent}
					onChange={(e) => setFormContent(e.target.value)}
					aria-label="Recipient's username"
					aria-describedby="basic-addon2"
				/>
			</InputGroup>
		)
	}

	return (
		<ListGroup.Item key={noteId} >
			<Container>
				<Row>
					<Col>
						<Row className="font-weight-bold">
							{isEdit ? <p className="text-wrap">{displayContent}</p> :
								renderEditInput()}
						</Row>
						<Row className="text-muted">
							Created: {new Date(createdAt).toLocaleString()}
						</Row>
					</Col>
					<Col>
						<ButtonToolbar
							className="justify-content-end"
							aria-label="Toolbar with Button groups">
							{isLoading ?
								<SpinnerButton />	: renderButtonGroup()}
						</ButtonToolbar>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	)
}

