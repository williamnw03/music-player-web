// Import Font Icon
import { ThreeDotsVertical } from "react-bootstrap-icons"

// Import CSS
import "./ListMusic.css"

// Import Components
import PlaylistDropdown from "./PlaylistDropdown"

function ListMusic(props) {
    
    // Artists
    let artists = ""
    props.data.artist.forEach((e, i) => artists += i+1 === props.data.artist.length ? e : `${e}, `)

    return (
        <div className="list-music" data-music-src={`../music/${props.data.fileName}`} onClick={(e) => props.changeMusic(e, props.data.fileName, props.data)}>
            <div className="image">
                <img src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${props.data.title}&backgroundColor=62A388`} alt="Image" />
            </div>

            <div className="text-content">
                <p className="title-music">{props.data.title}</p>
                <p className="artist-music">{artists}</p>
                <p className="genre-music">{props.data.genre}</p>
            </div>

            <div className="playlist-button">
            <div className="button-playlists" onClick={() => props.munculPlaylists(props.data.id)}><ThreeDotsVertical className="button-playlists"/></div>

                <div className={`playlists ${props.data.active ? "playlists-muncul" : ""}`}>
                    <PlaylistDropdown/>
                    <PlaylistDropdown/>
                    <PlaylistDropdown/>
                </div>
            </div>
        </div>
    )
}

export default ListMusic