import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";

	export default function CreateNewNoteButton ({
		onClick,
		...props
	}) {
		return (
			<ListGroup.Item action onClick={onClick} className="py-3 text-nowrap text-truncate">
				<BsPencilSquare size={17} />
				<span className="ml-2 font-weight-bold">Create a new note</span>
			</ListGroup.Item>
		);
	}




