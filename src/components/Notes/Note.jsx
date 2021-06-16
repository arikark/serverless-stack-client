import React, {useState} from "react";
import { useToggle } from "../../libs/hooks/commonHooksLib";
import { onError } from "../../libs/errorLib";
import { deleteNote, updateNote } from "../../libs/api/notesApi";


import {
	ListGroup, ButtonToolbar, ButtonGroup, Button, Spinner,
	InputGroup, FormControl, Col, Row, Container
} from "react-bootstrap";

export default function Note({ noteId, content, createdAt, dispatch }) {
	const [isEdit, setEdit] = useToggle(true)
	const [isLoading, setIsLoading] = useState(false);
	const displayContent = content?.trim().split("\n")[0];
	const [formContent, setFormContent] = useState(displayContent);

	const handleEdit = async () => {
		setIsLoading(true)
		try {
			console.log(`handleupdate: ${content}`)
			await updateNote(noteId, formContent);
			dispatch({type: "EDIT", noteId, formContent })
			setEdit(false)
		} catch (e) {
			onError(e)
		}
		setIsLoading(false)
	}

	const handleDelete = async () => {
		setIsLoading(true)
		try {
			await deleteNote(noteId);
			dispatch({type: "DELETE", noteId })
		} catch (e) {
			onError(e)
		}
	}

	return (
		<ListGroup.Item key={noteId} >
			<Container>
				<Row>
					<Col>
						<Row className="font-weight-bold">
								{isEdit ? <p className="text-wrap">{displayContent}</p> :
							<InputGroup className="mb-3">
								<FormControl
									type="text"
									value={formContent}
									onChange={(e) => setFormContent(e.target.value)}
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
								/>
							</InputGroup>}
						</Row>
						<Row className="text-muted">
							Created: {new Date(createdAt).toLocaleString()}
						</Row>
				</Col>
				<Col>
					<ButtonToolbar
						className="justify-content-end"
						aria-label="Toolbar with Button groups"
					>
						<ButtonGroup aria-label="edit and delete">
							{isEdit ?
								<Button variant="outline-secondary" onClick={setEdit}>Edit</Button> :
								<Button variant="outline-secondary" disabled={!formContent} onClick={handleEdit}>
									{isLoading ?
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
											/> : "Update"}
								</Button>
							}
								<Button variant="outline-secondary" onClick={handleDelete}>
									{isLoading ?
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/> : "Delete" }
								</Button>
						</ButtonGroup>
					</ButtonToolbar>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	)
}

