import { API } from "aws-amplify";

export async function get(apiName, apiPath) {
	return await API.get(apiName, apiPath);
}

export async function post(apiName, apiPath, body) {
	return API.post("notes", "/notes", {
		body
	});
}