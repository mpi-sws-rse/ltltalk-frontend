<<<<<<< HEAD
export async function EXAMPLEquery(url) {
	return fetch(url)
		.then((response) => {
			const responseJSON = response.json();
			return responseJSON;
		})
		.catch((error) => {
			alert('Error when getting worlds from server!');
		});
}
