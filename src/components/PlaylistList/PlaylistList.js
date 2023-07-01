import { useEffect, useState } from "react"

// Import Font Icon
import { Repeat } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"

// Import Components
import EachPlaylistList from "./EachPlaylistList"

// Import CSS
import "./PlaylistList.css"

function PlaylistList({data, playlists, setPlaylists, setMusic, setCurrentMusic}) {

    const {playlistID} = useParams()

    const [dataPlaylist, setDataPlaylist] = useState([])

    useEffect(() => {

        let currentPlaylist = {}

        if(playlists.length !== 0) {
            playlists.forEach(e => {
                if(e.id == playlistID){
                    currentPlaylist = e
                }
            })
    
            setDataPlaylist(currentPlaylist.songs)
        }

    }, [playlists])

    // Change Music
    const changeMusic = (e, fileName, data) => {

        if(e.target.classList.contains("button-delete") || e.target.parentElement.classList.contains("button-delete")) {
            return false
        }

        setMusic(prev => {
            const newAudio = prev
            newAudio.src = `/music/${fileName}.mp3`
            return newAudio
        }) 
        setCurrentMusic(data)
    }

    return (
    <div className="playlist-list-wrapper">
        <h1 className="title-page">Your Playlists</h1>
        <p className="subtitle-page">Up to 3 Playlists</p>
        <p className="loop-this-playlist"><Repeat/> Loop This Playlist</p>
        <div className="all-list-music-playlist">

            {dataPlaylist.length === 0 ? false : dataPlaylist.map((e, i) => {

                // Filter
                return (
                    <EachPlaylistList key={i} data={data} musicID={e} changeMusic={changeMusic}></EachPlaylistList>
                )

            })}
        </div>
    </div>
    )
}

export default PlaylistList