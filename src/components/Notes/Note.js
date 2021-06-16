import React, {useState} from "react";
import { ListGroup, ButtonToolbar, ButtonGroup, Button, InputGroup, FormControl, Col, Row, Container } from "react-bootstrap";
import { useToggle } from "../../libs/hooksLib";

export default function Note({ noteId, content, createdAt, handleDelete, handleUpdate }) {
	const [isEdit, setEdit] = useToggle(true)
	const [isLoading, setIsLoading] = useState(false);
	const displayContent = content.trim().split("\n")[0];
	const [formContent, setFormContent] = useState(displayContent);

	const handleEdit = async () => {
		setIsLoading(true)
		await handleUpdate(noteId, formContent);
		setIsLoading(false)
		setEdit(false)
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
							{isLoading && isEdit ?
								<Button variant="outline-secondary" onClick={setEdit}>Edit</Button> :
								<Button variant="outline-secondary submit" disabled={!formContent} onClick={handleEdit}
								>Update</Button>
								}
							<Button variant="outline-secondary" onClick={()=>handleDelete(noteId)}>Delete</Button>
						</ButtonGroup>
					</ButtonToolbar>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	)
}

