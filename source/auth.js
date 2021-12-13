import { JSO, Popup } from "jso";

const getRedirectURL = () => {
	return browser.identity.getRedirectURL();
};

export const authenticateToGenius = async () => {
	console.log("----\n------\n-------\n------\n-------- authenticateToGenius");
	const geniusClientID =
		"BsNmoV3mmRzhAHc-pUcbpS9-VzlUaMfFzOMcbt0mM2bSDtNmKYhGFqEKbxsYH6N8";

	const client = new JSO({
		providerID: "genius",
		client_id: geniusClientID,
		redirect_uri: getRedirectURL(),
		authorization: "https://api.genius.com/oauth/authorize",
		scopes: {
			request: ["me"],
		},
	});
	console.log("getting token:::::: ");
	const token = await client.getToken();
	console.log(token);

	return token;
};

window.onload = () => {
	document.querySelector("button").addEventListener("click", async () => {
		authenticateToGenius();
		//chrome.identity.getAuthToken({ interactive: true }, function (token) {
		//console.log(token);
		//});
	});
};
