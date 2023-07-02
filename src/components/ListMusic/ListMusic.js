import { Link } from "react-router-dom"

// Import Font Icon
import { ThreeDotsVertical } from "react-bootstrap-icons"

// Import CSS
import "./ListMusic.css"

// Import Components
import PlaylistDropdown from "./PlaylistDropdown"

function ListMusic({data, changeMusic, munculPlaylists, playlists, addNewMusic}) {
    
    // Artists
    let artists = ""
    data.artist.forEach((e, i) => artists += i+1 === data.artist.length ? e : `${e}, `)

    return (
        <div className="list-music" onClick={(e) => changeMusic(e, data.fileName, data)}>
            <div className="image">
                <img src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${data.title}&backgroundColor=62A388`} alt="Image" />
            </div>

            <div className="text-content">
                <p className="title-music">{data.title}</p>
                <p className="artist-music">{artists}</p>
                <p className="genre-music">{data.genre}</p>
            </div>

            <div className="playlist-button">
            <div className="button-playlists" onClick={() => munculPlaylists(data.id)}><ThreeDotsVertical className="button-playlists"/></div>

            <div className={`playlists ${data.active ? "playlists-muncul" : ""}`}>
                {playlists.length ? playlists.map((playlist) =>{
                    return <PlaylistDropdown key={playlist.id} playlist={playlist} playlists={playlists} musicID={data.id} addNewMusic={addNewMusic}/>
                }) : <div className="playlist" style={{backgroundColor:"maroon"}}> {<Link className="playlist" to="/playlists" style={{color:"#F5F5F5", textDecoration:"none"}}>Create your playlist first</Link>}</div>}
            </div>


            </div>
        </div>
    )
}

export default ListMusic