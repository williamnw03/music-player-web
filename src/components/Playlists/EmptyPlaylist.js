// Import Font Icon
import { PlusSquareFill } from "react-bootstrap-icons"

// Import CSS
import "./Playlist.css"

function EmptyPlaylist({addPlaylist}) {

    return (
        <div className="empty-playlist">
            <div className="add-playlist-button"><PlusSquareFill onClick={addPlaylist}></PlusSquareFill></div>
        </div>
    )
}

export default EmptyPlaylist

