import browser from "webextension-polyfill";

browser.browserAction.onClicked.addListener(function () {
	browser.tabs.create({ url: "auth.html" });
});
