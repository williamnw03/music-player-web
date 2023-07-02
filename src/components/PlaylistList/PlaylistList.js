import { useEffect, useState } from "react"

// Import Font Icon
import { Repeat } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"

// Import Components
import EachPlaylistList from "./EachPlaylistList"
import Alert from "../Alert/Alert"

// Import CSS
import "./PlaylistList.css"

function PlaylistList({data, playlists, setPlaylists, setMusic, setCurrentMusic, alertDelete, setAlertDelete}) {

    const {playlistID} = useParams()

    const [dataPlaylist, setDataPlaylist] = useState([])

    const [playlistMusicDelete, setPlaylistMusicDelete] = useState(-1)

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

    // Remove Music
    const removeMusic = (playlist, setPlaylists, playlists, musicID) => {
        const newPlaylists = [...playlists];

        const newestPlaylists = newPlaylists.map(each => {
            const newPlaylist = {...each}

            if(newPlaylist.id === playlist.id) {
                newPlaylist.songs.splice(newPlaylist.songs.indexOf(musicID), 1);   
            }

            return newPlaylist;
        })

        setPlaylists(newestPlaylists)
        localStorage.setItem('playlists', JSON.stringify(newestPlaylists))
    }

    // Close Alert
    const closeAlert = (setAlertDelete) => {
        setAlertDelete(false)
    }

    return (
    <>
        {/* <Alert itemToDelete={"music-playlist"} playlistMusicDelete={playlistMusicDelete} removeMusic={removeMusic} playlists={playlists} setPlaylists={setPlaylists} closeAlert={closeAlert} alertDelete={alertDelete} setAlertDelete={setAlertDelete} playlistID={playlistID}/> */}
        
        <div className="playlist-list-wrapper">
            <h1 className="title-page">Your Playlists</h1>
            <p className="subtitle-page">Up to 3 Playlists</p>
            <p className="loop-this-playlist"><Repeat/> Loop This Playlist</p>
            <div className="all-list-music-playlist">

                {dataPlaylist.length === 0 ? false : dataPlaylist.map((e, i) => {

                    // Filter
                    return (
                        <EachPlaylistList key={i} data={data} musicID={e} changeMusic={changeMusic} playlists={playlists} setPlaylists={setPlaylists} playlistID={playlistID} setAlertDelete={setAlertDelete} setPlaylistMusicDelete={setPlaylistMusicDelete}></EachPlaylistList>
                    )

                })}
            </div>
        </div>
    </>
    )
}

export default PlaylistList