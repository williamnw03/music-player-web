
// Impprt Components
import Playlist from "./Playlist"

// Import CSS
import "./Playlists.css"

function Playlists() {
    return (
        <div className="all-playlists">
            <Playlist></Playlist>
            <Playlist></Playlist>
            <Playlist></Playlist>
        </div>
    )
}

export default Playlists