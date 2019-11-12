#!/usr/bin/nodejs

const cp = require('child_process');
const {promises: fs} = require('fs');
const path = require('path');

const PLAYLIST_LOC = '/tmp/vlcplaylist.m3u';

(async () => {
	const file = process.argv[2];
	let dirPath = file;

	const fileIsDir = (await fs.stat(file)).isDirectory();

	if (!fileIsDir) dirPath = path.dirname(file);

	const files = (await fs.readdir(dirPath)).sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()));

	const playlist = files.map((f) => path.join(dirPath, f));

	if (!fileIsDir) {
		const startIndex = files.indexOf(path.basename(file));
		playlist.push(...playlist.splice(0, startIndex));
	}

	await fs.writeFile(PLAYLIST_LOC, playlist.join('\n'));

	cp.spawn('vlc', [PLAYLIST_LOC, '--no-random', ...process.argv.slice(2)], {
		detached: true,
	});

	process.exit();
})();
