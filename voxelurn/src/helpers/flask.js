import { EXAMPLE_SERVER_URL } from "constants/strings"

export async function EXAMPLEquery(url) {
	return fetch(url, {credentials: "include"})
		.then((response) => {
			const responseJSON = response.json();
			return responseJSON;
		})
		.catch((error) => {
			alert('Error when getting worlds from server!');
			alert(error);
		});
}
