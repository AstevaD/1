import {
	listenToChildChanges,
	getSidebarElement,
	checkHasLyricsSection,
	getElementAfterControls,
	createLyricsNode,
} from "./dom_utils";

const insertLyricsIfNeeded = () => {
	const sidebar = getSidebarElement();

	// Sidebar is not currently open.
	if (!sidebar) return;

	const hasLyrics = checkHasLyricsSection(sidebar);

	if (hasLyrics) return;

	const elementAfterControls = getElementAfterControls(sidebar);
	const lyricsNode = createLyricsNode("lyrics");
	sidebar.insertBefore(lyricsNode, elementAfterControls);
};

(() => {
	"use strict";

	const sidebarPlaceholder = document.querySelector(".sidebar__placeholder");
	listenToChildChanges(sidebarPlaceholder, insertLyricsIfNeeded);
})();
