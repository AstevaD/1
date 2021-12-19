export const fetchLyrics = async (accessToken, songInfo) => {
	// NOTE: this doesn't work as the module is currently Node.js only.
	// Waiting for response from https://github.com/zyrouge/genius-lyrics/issues/24
	const Genius = require("genius-lyrics");
	const client = Genius.Client(accessToken);
	const searchQuery = `${songInfo.artists} ${songInfo.title}`;

	try {
		const searchResults = await client.songs.search(searchQuery);
		if (!searchResults || !searchResults[0]) {
			return null;
		}

		const firstResult = searchResults[0];
		const lyrics = await firstResult.lyrics();
		return lyrics;
	} catch (e) {
		console.error(`[yandex-music-genius] Unexpected error: ${e}`);
		return null;
	}
};
