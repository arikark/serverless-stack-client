import React from "react";
import ListGroup from "react-bootstrap/ListGroup";


export default function Note({ noteId, content, createdAt }) {
	return (
		<ListGroup.Item action key={noteId} >
			<span className="font-weight-bold">
				{content.trim().split("\n")[0]}
			</span>
			<br />
			<span className="text-muted">
				Created: {new Date(createdAt).toLocaleString()}
			</span>
		</ListGroup.Item>
	)
}

