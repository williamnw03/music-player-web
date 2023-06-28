import React from 'react';

// Import Font Icon
import { Trash3Fill, PencilFill } from "react-bootstrap-icons"

// Import CSS
import "./Playlist.css"

function Playlist() {
    return (
        <div className="playlist-box">

            <div className="playlist-buttons">
                <div className="playlist-button delete-playlist">
                    <Trash3Fill/>
                </div>

                <div className="playlist-button rename-playlist">
                    <PencilFill/>
                </div>
            </div>

            <div className="image">
                <img src="https://api.dicebear.com/6.x/thumbs/svg?seed=Hallo&backgroundColor=62A388"/>
            </div>

            <div className="text-content">
                <p className="title-playlist">Lagu2 Yang Seru</p>
                <p className="number-playlist">#Playlist 1</p>
            </div>
        </div>
    )
}

export default Playlist