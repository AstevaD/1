import browser from "webextension-polyfill";

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
		console.log(`Error when authenticating: ${e}`);
		return null;
	}
};

const saveTokenToStorage = async (accessToken) => {
	await browser.storage.local.set({ accessToken });
};

window.onload = () => {
	document.querySelector("button").addEventListener("click", async () => {
		const token = await authenticateToGenius();
		if (token) await saveTokenToStorage(token);
		console.log(browser.storage.local.get("token"));
	});
};
