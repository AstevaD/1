import browser from "webextension-polyfill";

browser.browserAction.onClicked.addListener(function () {
	console.log("testttt");
	browser.tabs.create({ url: "auth.html" });
});
