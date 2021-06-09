import { API } from "aws-amplify";
import { onError } from "./errorLib"

export function getNotes() {
	try {
		return API.get("notes", "/notes");
	} catch (e) {
		onError(e)
	}
}

export function postNote(body) {
	try {
		API.post("notes", "/notes", {
			body
	});
	} catch (e) {
		onError(e)
	}
}