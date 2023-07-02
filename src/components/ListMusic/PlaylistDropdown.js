function PlaylistDropdown({playlist, playlists, musicID, addNewMusic}) {

    return (
        <div className="playlist" dangerouslySetInnerHTML={{ __html: playlist.name }} onClick={() => addNewMusic(playlist, playlists, musicID)} style={{backgroundColor: playlist.songs.includes(musicID) ? "#343434" : ""}}></div>
    )
}

export default PlaylistDropdown