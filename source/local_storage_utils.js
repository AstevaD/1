import browser from "webextension-polyfill";

export const saveTokenToStorage = async (accessToken) => {
	await browser.storage.local.set({ accessToken });
};

export const getTokenFromStorage = async () => {
	const accessTokenObj = await browser.storage.local.get("accessToken");
	return accessTokenObj.accessToken;
};
