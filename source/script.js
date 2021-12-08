const checkHasLyricsSection = (sidebarElement) => {
	const lyricsSectionClassName = "sidebar__section_lyric";

	const children = sidebarElement.children;
	for (let i = 0; i < children.length; i++) {
		if (children[i].className.includes(lyricsSectionClassName)) {
			return true;
		}
	}

	// Didn't find an element with `lyricsSectionClassName` which means
	// that currently selected song doesn't have a lyrics section.
	return false;
};

// Returns the index of controls section element.
// Returns null if controls are not present.
const getElementAfterControls = (sidebarElement) => {
	const controlsClassName = "sidebar__section";

	const children = sidebarElement.children;
	for (let i = 0; i < children.length; i++) {
		if (children[i].className === controlsClassName) {
			return children[i + 1];
		}
	}

	return null;
};

const createDiv = () => document.createElement("div");

const createLyricsNode = (text) => {
	const lyricsSection = createDiv();
	lyricsSection.className = "sidebar__section sidebar__section_lyric";

	const lyricsTitle = createDiv();
	lyricsTitle.className =
		"sidebar__section-title sidebar-track__lyric-title typo-caps deco-typo-secondary";
	const lyricsTitleText = document.createTextNode(
		"Song lyrics (from Genius)"
	);
	lyricsTitle.appendChild(lyricsTitleText);

	lyricsSection.appendChild(lyricsTitle);

	const lyricsTrack = createDiv();
	lyricsTrack.className = "sidebar-track__lyric";
	const lyricsText = createDiv();
	lyricsText.className = "sidebar-track__lyric-text typo";
	const lyricsTextNode = document.createTextNode(text);
	lyricsText.appendChild(lyricsTextNode);
	lyricsTrack.appendChild(lyricsText);

	lyricsSection.appendChild(lyricsTrack);

	return lyricsSection;
};

const getSidebarElement = () => {
	const sidebarTrackQuery = ".sidebar-track";

	const sidebars = document.querySelectorAll(sidebarTrackQuery);
	return sidebars[sidebars.length - 1];
};

const getLyrics = () => {};

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

// Returns a callback to close the listener.
const listenToChildChanges = (element, callback) => {
	const observer = new MutationObserver((_) => {
		callback();
	});
	observer.observe(element, { subtree: true, childList: true });
	return observer.disconnect;
};

(() => {
	"use strict";

	const sidebarPlaceholder = document.querySelector(".sidebar__placeholder");
	listenToChildChanges(sidebarPlaceholder, insertLyricsIfNeeded);
})();
