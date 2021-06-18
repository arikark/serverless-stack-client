import React from "react";

import { Button, Spinner } from "react-bootstrap";

export default function SpinnerButton() {
	return(
		<Button variant="outline-secondary">
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true"
			/>
		</Button>
	)
}
