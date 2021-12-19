import {
	listenToChildChanges,
	getSidebarElement,
	checkHasLyricsSection,
	getElementAfterControls,
	createLyricsNode,
	getSongInfo,
} from "./dom_utils";
import { getTokenFromStorage } from "./local_storage_utils";
import { fetchLyrics } from "./genius";

const insertLyricsIfNeeded = async () => {
	const sidebar = getSidebarElement();

	// Sidebar is not currently open.
	if (!sidebar) return;

	const hasLyrics = checkHasLyricsSection(sidebar);

	if (hasLyrics) return;

	const songInfo = getSongInfo(sidebar);
	const accessToken = await getTokenFromStorage();

	const lyrics = await fetchLyrics(accessToken, songInfo);
	if (lyrics) {
		const elementAfterControls = getElementAfterControls(sidebar);
		const lyricsNode = createLyricsNode(lyrics);
		sidebar.insertBefore(lyricsNode, elementAfterControls);
	}
};

(() => {
	"use strict";

	const sidebarPlaceholder = document.querySelector(".sidebar__placeholder");
	listenToChildChanges(sidebarPlaceholder, insertLyricsIfNeeded);
})();
