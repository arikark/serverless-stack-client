import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import { useUserContext, useNotesContext } from "../libs/contextLib";
import { v4 as uuid } from 'uuid';

import { postNote } from "../libs/apiLib";


export default function NewNote(props) {
  const file = useRef(null);
  const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { notes, setNotes } = useNotesContext();


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
				`Please pick a file smaller than ${
					config.MAX_ATTACHMENT_SIZE / 1000000
				} MB.`
			);
			return;
		}

		setIsLoading(true);

		try {
			const attachment = file.current ? await s3Upload(file.current) : null;
			const newNote = { noteId: uuid(), content, attachment, completed: false, createdAt: new Date(Date.now()).toLocaleString()}
			setNotes(notes => [...notes, newNote]);
			await postNote(newNote);
			// const notes = await loadNotes();
			// updateNotes(notes);
			setIsLoading(false);
			setContent("")
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	}

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={content}
            as="textarea"
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
      </Form>
    </div>
  );
}