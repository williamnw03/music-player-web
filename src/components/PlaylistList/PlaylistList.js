import { useEffect, useState } from "react"

// Import Font Icon
import { Repeat } from "react-bootstrap-icons"
import { useNavigate, useParams } from "react-router-dom"

// Import Components
import EachPlaylistList from "./EachPlaylistList"
import Alert from "../Alert/Alert"

// Import CSS
import "./PlaylistList.css"

function PlaylistList({data, playlists, changeMusicInPlaylist, showAlertDeleteMusicInPlaylist, removeMusicInPlaylist, closeAlert, alertDelete, changeAlertDelete}) {

    const navigate = useNavigate()

    const {playlistID} = useParams()

    const [dataPlaylist, setDataPlaylist] = useState([])

    // Music in PLaylist to Delete
    const [musicInPlaylistDelete, setMusicInPlaylistDelete] = useState(-1)

    const changeMusicInPlaylistDelete = (musicID) => {
        setMusicInPlaylistDelete(musicID)
    }

    useEffect(() => {

        const playlistsDataLocalstorage = JSON.parse(localStorage.getItem("playlists"))
        console.log("LEWAT")
        console.log(playlistsDataLocalstorage[0])

        let currentPlaylist = {}

        if(playlistsDataLocalstorage.length !== 0) {

            if(!playlistsDataLocalstorage.find(playlist => playlist.id == playlistID)){
                navigate("/playlists")
            }

            playlistsDataLocalstorage.forEach(e => {
                if(e.id == playlistID){
                    currentPlaylist = e
                }
            })

            console.log(currentPlaylist)
    
            setDataPlaylist(currentPlaylist.songs)
        } else {
            navigate("/playlists")
        }

    }, [playlists])

    console.log(dataPlaylist.length)

    return (
    <>
        <Alert itemToDelete={"music-playlist"} musicInPlaylistDelete={musicInPlaylistDelete} removeMusicInPlaylist={removeMusicInPlaylist} playlists={playlists} closeAlert={closeAlert} alertDelete={alertDelete} playlistID={playlistID}/>

        <div className="playlist-list-wrapper">
            <h1 className="title-page">Your Playlists</h1>
            <p className="subtitle-page">Up to 3 Playlists</p>
            <p className="loop-this-playlist"><Repeat/> Loop This Playlist</p>
            <div className="all-list-music-playlist">

                {dataPlaylist.length === 0 ? false : dataPlaylist.map((e, i) => {

                    // Filter
                    return (
                        <EachPlaylistList key={i} data={data} musicID={e} changeMusicInPlaylist={changeMusicInPlaylist} playlists={playlists} showAlertDeleteMusicInPlaylist={showAlertDeleteMusicInPlaylist} changeAlertDelete={changeAlertDelete} changeMusicInPlaylistDelete={changeMusicInPlaylistDelete}></EachPlaylistList>
                    )

                })}
            </div>
        </div>
    </>
    )
}

export default PlaylistList