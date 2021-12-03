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

(function() {
    'use strict';

	const sidebarTrackQuery = '.sidebar-track';

	const sidebar = document.querySelector(sidebarTrackQuery);

    // Your code here...
})();
