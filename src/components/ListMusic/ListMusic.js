// Import Font Icon
import { ThreeDotsVertical } from "react-bootstrap-icons"

// Import CSS
import "./ListMusic.css"

// Import Components
import Playlist from "./Playlist"

function ListMusic() {
    return (
        <div className="list-music">
            <div className="image">
                <img src="https://api.dicebear.com/6.x/thumbs/svg?seed=Berak Tak Cebok&backgroundColor=62A388" alt="Image" />
            </div>

            <div className="text-content">
                <p className="title-music">Berak Tak Cebok</p>
                <p className="artist-music">Kufaku</p>
            </div>

            <div className="playlist-button">
            <div className="button"><ThreeDotsVertical/></div>

                <div className="playlists">
                    <Playlist/>
                    <Playlist/>
                    <Playlist/>
                </div>
            </div>
        </div>
    )
}

export default ListMusic