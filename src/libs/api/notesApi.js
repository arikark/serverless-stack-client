import { API } from "aws-amplify";
import { onError } from "../errorLib"

export function getNotes() {
	try {
		return API.get("notes", "/notes");
	} catch (e) {
		onError(e)
	}
}

export function postNote(body) {
	try {
		return API.post("notes", "/notes", {
			body
	});
	} catch (e) {
		onError(e)
	}
}

export function deleteNote(noteId) {
	try {
		console.log("delete")
		return API.del("notes", `/notes/${noteId}`);
	} catch (e) {
		onError(e)
	}
}

export function updateNote(noteId, content) {
	try {
		console.log(`updateNote: ${content}`)
		return API.put("notes", `/notes/${noteId}`, {
			body: {
				content
			}
		});
	} catch (e) {
		onError(e)
	}
}