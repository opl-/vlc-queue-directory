# VLC Queue Directory

## Why?

Despite many requests over many years [[1]](https://trac.videolan.org/vlc/ticket/2024) [[2]](https://forum.videolan.org/viewtopic.php?t=125327) VLC does not have an option to automatically play the next file in the directory after being opened by pointing to one of the files in that directory.

I got tired of it and wrote a Node.js script to fix that issue.

## How?

The script takes in the file passed in as an argument, lists all the files in the directory and creates a playlist with all the files in the directory, starting at the selected file. It then writes the playlist to (by default) `/tmp/vlcplaylist.m3u` and starts VLC with that playlist.
