import React, {useState } from 'react'
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable'

// Import Font Icon
import { Trash3Fill, PencilFill } from "react-bootstrap-icons"

// Import CSS
import "./Playlist.css"

function Playlist({playlists, setPlaylists, playlist, removePlaylist}) {

    const [playlistName, setPlaylistName] = useState(playlist.name)
    const [disabledEditName, setDisabledEditName] = useState(true)

    // Playlist Name Change
    const titleChange = (e, playlist, playlists, setPlaylists, playlistName) => {

        const sanitizeConf = {
            allowedTags: [],
            allowedAttributes: {}
        }

        setPlaylistName(sanitizeHtml(e.target.textContent, sanitizeConf))
        
        const playlistID = playlist.id
        const newPlaylists = playlists.map(each => {
            return each.id === playlistID ? {...each, name: sanitizeHtml(e.target.textContent, sanitizeConf)} : each
        })
        localStorage.setItem("playlists", JSON.stringify(newPlaylists))
        setPlaylists(newPlaylists)
    }

    // Editable Playlist Name
    const EditStatus = () => {
        setDisabledEditName(prev => !prev)
    }

    return (
        <div className="playlist-box">

            <div className="playlist-buttons">
                <div className="playlist-button delete-playlist" onClick={() => removePlaylist(playlists, playlist)}>
                    <Trash3Fill/>
                </div>

                <div className="playlist-button rename-playlist" style={disabledEditName ? {} : {backgroundColor: "#055E68", color: "#F5F5F5"}} onClick={EditStatus}>
                    <PencilFill/>
                </div>
            </div>

            <div className="image">
                <img src="https://api.dicebear.com/6.x/thumbs/svg?seed=Hallo&backgroundColor=62A388"/>
            </div>

            <div className="text-content">
                <ContentEditable disabled={disabledEditName} tagName='p' html={playlistName} className="title-playlist" style={{backgroundColor: disabledEditName ? "transparent" : "#B9D2D2" }} onBlur={(e) => titleChange(e, playlist, playlists, setPlaylists, playlistName)}/>

                <p className="number-playlist">#Playlist {playlist.id}</p>
            </div>
        </div>
    )
}

export default Playlist