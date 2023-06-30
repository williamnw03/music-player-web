function PlaylistDropdown({playlist, setPlaylists, playlists, musicID}) {

    const addNewMusic = (playlist, setPlaylists, playlists, musicID) => {
        const newPlaylists = [...playlists];

        const newestPlaylists = newPlaylists.map(each => {
            const newPlaylist = {...each}
            if(newPlaylist.id === playlist.id) {

                if(!newPlaylist.songs.find(song => song === musicID)) {
                    newPlaylist.songs.push(musicID);
                } else {
                    newPlaylist.songs.splice(newPlaylist.songs.indexOf(musicID), 1);   
                }
            }

            return newPlaylist;
        })

        setPlaylists(newestPlaylists)
        localStorage.setItem('playlists', JSON.stringify(newestPlaylists))
    }


    return (
        <div className="playlist" dangerouslySetInnerHTML={{ __html: playlist.name }} onClick={() => addNewMusic(playlist, setPlaylists, playlists, musicID)} style={{backgroundColor: playlist.songs.includes(musicID) ? "#343434" : ""}}></div>
    )
}

export default PlaylistDropdown