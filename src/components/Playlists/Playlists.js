import { useEffect, useState } from "react"
import { useId } from "react-id-generator";

// Impprt Components
import Playlist from "./Playlist"
import EmptyPlaylist from "./EmptyPlaylist"
import Alert from "../Alert/Alert";

// Import CSS
import "./Playlists.css"

function Playlists({alertDelete, setAlertDelete}) {

    // Data Playlists
    const [playlists, setPlaylists] = useState([])
    
    useEffect(() => {
        if(!JSON.parse(localStorage.getItem("playlists"))){
            localStorage.setItem("playlists", JSON.stringify([]))
            setPlaylists(JSON.parse(localStorage.getItem("playlists")))
        } else {
            setPlaylists(JSON.parse(localStorage.getItem("playlists")))
        }
    }, [])

    // Add New Playlist
    const addPlaylist = (playlists) => {
        const newPlaylists = [...playlists]

        const emptyPlaylist = (id) => {
            const playlist = {
                id: id,
                name: "New Playlist",
                songs: []
            }

            return playlist
        }

        if(playlists.length === 0){
            const playlist = emptyPlaylist(1)
            newPlaylists.push(playlist)
        } else if(playlists.length === 3){
            return false
        } else {
            const playlistID = []
            playlists.forEach(playlist => playlistID.push(playlist.id));

            if(!playlistID.includes(1)){
                const playlist = emptyPlaylist(1)
                newPlaylists.push(playlist)

            } else if(!playlistID.includes(2)){
                const playlist = emptyPlaylist(2)
                newPlaylists.push(playlist)
            } else {
                const playlist = emptyPlaylist(3)
                newPlaylists.push(playlist)
            }
        }

        localStorage.setItem("playlists", JSON.stringify(newPlaylists))
        setPlaylists(newPlaylists)
    }

    // Playlist to Delete
    const [playlistDelete, setPlaylistDelete] = useState({})

    // Remove Playlist
    const removePlaylist = (playlists, playlist, setPlaylists) => {
        const playlistID = playlist.id
        const newPlaylists = playlists.filter(playlist => playlist.id !== playlistID)
        localStorage.setItem("playlists", JSON.stringify(newPlaylists))
        setPlaylists(newPlaylists)
        setAlertDelete(false)
    }

    // Close Alert
    const closeAlert = () => {
        setAlertDelete(false)
    }

    return (
        <>
            <Alert playlistDelete={playlistDelete} removePlaylist={removePlaylist} playlists={playlists} setPlaylists={setPlaylists} closeAlert={closeAlert} alertDelete={alertDelete}/>
            <div className="playlists-wrapper">
                <h1 className="title-page">Your Playlists</h1>
                <p className="subtitle-page">Up to 3 Playlists</p>
                <div className="all-playlists">
                    {
                        playlists.length >= 1 ? playlists.map((playlist) => {
                            return <Playlist key={playlist.id} playlists={playlists} setPlaylists={setPlaylists} playlist={playlist} removePlaylist={removePlaylist} setAlertDelete={setAlertDelete} setPlaylistDelete={setPlaylistDelete}></Playlist>
                        }) : false
                    }
                    {playlists.length <= 2 ? <EmptyPlaylist addPlaylist={() => addPlaylist(playlists)}></EmptyPlaylist> : false}
                </div>
            </div>
        </>
    )
}

export default Playlists