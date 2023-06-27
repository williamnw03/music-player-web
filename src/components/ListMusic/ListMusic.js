// Import Font Icon
import { useState } from "react"
import { ThreeDotsVertical } from "react-bootstrap-icons"

// Import CSS
import "./ListMusic.css"

// Import Components
import Playlist from "./Playlist"

function ListMusic(props) {

    return (
        <div className="list-music" data-music-src={`../music/${props.data.fileName}`} onClick={(e) => props.changeMusic(e, props.data.fileName, props.data)}>
            <div className="image">
                <img src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${props.data.title}&backgroundColor=62A388`} alt="Image" />
            </div>

            <div className="text-content">
                <p className="title-music">{props.data.title}</p>
                <p className="artist-music">{props.data.artist}</p>
                <p className="artist-music">{props.data.genre}</p>
            </div>

            <div className="playlist-button">
            <div className="button-playlists" onClick={() => props.munculPlaylists(props.data.id)}><ThreeDotsVertical className="button-playlists"/></div>

                <div className={`playlists ${props.data.active ? "playlists-muncul" : ""}`}>
                    <Playlist/>
                    <Playlist/>
                    <Playlist/>
                </div>
            </div>
        </div>
    )
}

export default ListMusic