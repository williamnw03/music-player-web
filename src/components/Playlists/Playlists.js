import { useId } from "react-id-generator";

// Impprt Components
import Playlist from "./Playlist"
import EmptyPlaylist from "./EmptyPlaylist"
import Alert from "../Alert/Alert";

// Import CSS
import "./Playlists.css"

function Playlists({playlists, playlistName, changePlaylistsData, titleChange, showAlertDeletePlaylist, addPlaylist, removePlaylist, closeAlert, playlistDelete, alertDelete}) {

    return (
        <>
            <Alert itemToDelete={"playlist"} playlistDelete={playlistDelete} removePlaylist={removePlaylist} playlists={playlists} closeAlert={closeAlert} alertDelete={alertDelete}/>
            <div className="playlists-wrapper">
                <h1 className="title-page">Your Playlists</h1>
                <p className="subtitle-page">Up to 3 Playlists</p>
                <div className="all-playlists">

                    
                    {
                        
                        playlists.length >= 1 ? playlists.map((playlist) => {
                            return <Playlist key={playlist.id} playlists={playlists} changePlaylistsData={changePlaylistsData} playlist={playlist} titleChange={titleChange} showAlertDeletePlaylist={showAlertDeletePlaylist} playlistName={playlistName}></Playlist>
                        }) : false
                    }
                    {playlists.length <= 2 ? <EmptyPlaylist addPlaylist={() => addPlaylist(playlists)}></EmptyPlaylist> : false}
                </div>
            </div>
        </>
    )
}

export default Playlists