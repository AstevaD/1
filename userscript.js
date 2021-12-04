// ==UserScript==
// @name         Genius Integration for Yandex Music
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://music.yandex.com/*
// @icon         https://www.google.com/s2/favicons?domain=genius.com
// @grant        none
// ==/UserScript==

const checkHasLyricsSection = (sidebarElement) => {
	const lyricsSectionClassName = 'sidebar__section_lyric';

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
	const controlsClassName = 'sidebar__section';

	const children = sidebarElement.children;
	for (let i = 0; i < children.length; i++) {
		if (children[i].className === controlsClassName) {
			return children[i+1];
		}
	}

	return null;
};

const createLyricsNode = (lyricsText) => {
	const paragraph = document.createElement("p");
	const node = document.createTextNode(lyricsText);
	paragraph.appendChild(node);

	return paragraph;
};

const insertLyricsIfNeeded = () => {
	const sidebarTrackQuery = '.sidebar-track';

	const sidebar = document.querySelector(sidebarTrackQuery);
	const hasLyrics = checkHasLyricsSection(sidebar);

	if (hasLyrics) return;

	const elementAfterControls = getElementAfterControls(sidebar);
	const lyricsNode = createLyricsNode("Lyrics yo!");
	sidebar.insertBefore(lyricsNode, elementAfterControls);
};

(function() {
    'use strict';

	insertLyricsIfNeeded();
})();
