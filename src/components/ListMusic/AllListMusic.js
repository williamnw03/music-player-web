
// Import Components
import ListMusic from "./ListMusic"

// Import CSS
import "./AllListMusic.css"
import { useEffect, useState } from "react"

function AllListMusic({setMusic, setCurrentMusic, data, setData, setTotalGenre, playlists, setPlaylists}) {

    // Fetch Music
    const fetchMusic = async () => {
        const resp = await fetch("./music-data.json")
        const data = await resp.json()

        setData(data.map(e => {
            return {...e, active: false, genreShow: true, searchShow: true}
        }))

        const genres = []
        data.forEach(e => {
            e.genre.forEach(e2 => {
                if(!genres.includes(e2)){
                    genres.push(e2)
                }
            })
        });

        setTotalGenre(genres)


    }

    // Show Playlists
    const munculPlaylists = (id) => {
        setData(prev => {
            return prev.map(e => {
                if(e.id === id) {
                    // Close Playlists
                    if(e.active){
                        return {...e, active: false}
                    }
                    return {...e, active: true}
                } else {
                    return {...e, active: false}
                }
            })
        })
    }

    // Close Playlists
    const closePlaylists = (e) => {

        if(e.target.parentElement === null) {
            setData(prev => prev.map(e => {
                return {...e, active: false}
            }))

            return false
        }

        if(!e.target.classList.contains("button-playlists") && !e.target.parentElement.classList.contains("button-playlists")) {
            setData(prev => prev.map(e => {
                return {...e, active: false}
            }))
        }

    }

    // Change Music
    const changeMusic = (e, fileName, data) => {

        if(e.target.classList.contains("button-playlists") || e.target.parentElement.classList.contains("button-playlists") || e.target.classList.contains("playlist")) {
            return false
        }
        setMusic(prev => {
            const newAudio = prev
            newAudio.src = `./music/${fileName}.mp3`
            return newAudio
        }) 
        setCurrentMusic(data)
    }

    useEffect(() => {
        // Fetch Music
        fetchMusic()

        document.addEventListener("click", closePlaylists)

        return () => {
            document.removeEventListener("click", closePlaylists)
        }
    }, [])

    return (
        <>
            <div className="all-list-music">

                {data.map((e, i) => {
                    // Filter
                    if(e.searchShow){
                        if(e.genreShow){
                            return (
                                <ListMusic key={i} munculPlaylists={munculPlaylists} data={e} changeMusic={changeMusic} playlists={playlists} setPlaylists={setPlaylists}></ListMusic>
                            )
                        }
                    }
                })}
            </div>
        </>

    )
}

export default AllListMusic