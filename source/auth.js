import browser from "webextension-polyfill";
import { saveTokenToStorage } from "./local_storage_utils";

const getRedirectURL = () => {
	return browser.identity.getRedirectURL();
};

const extractAccessTokenFromURL = (url) => {
	const matches = url.match(/access_token=([^&]*)/);
	return matches[1];
};

const authenticateToGenius = async () => {
	const geniusClientID =
		"BsNmoV3mmRzhAHc-pUcbpS9-VzlUaMfFzOMcbt0mM2bSDtNmKYhGFqEKbxsYH6N8";
	const scopes = ["me"];

	let url = "https://api.genius.com/oauth/authorize";
	url += `?response_type=token`;
	url += `&scope=${encodeURIComponent(scopes.join(" "))}`;
	url += `&client_id=${geniusClientID}`;
	url += `&redirect_uri=${encodeURIComponent(getRedirectURL())}`;
	url += `&state=button-pressed`;

	try {
		const callbackUrl = await browser.identity.launchWebAuthFlow({
			url: url,
			interactive: true,
		});
		return extractAccessTokenFromURL(callbackUrl);
	} catch (e) {
		console.error(`Error when authenticating: ${e}`);
		return null;
	}
};

window.onload = () => {
	document.querySelector("button").addEventListener("click", async () => {
		const token = await authenticateToGenius();
		if (token) await saveTokenToStorage(token);
	});
};
