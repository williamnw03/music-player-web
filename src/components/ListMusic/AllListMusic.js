
// Import Components
import ListMusic from "./ListMusic"

// Import CSS
import "./AllListMusic.css"
import { useEffect, useState } from "react"

function AllListMusic() {

    // Data
    const [data, setData] = useState(Array(50).fill().map((e, i) => ({id: i+1, active: false})))

    // Show Playlists
    const munculPlaylists = (id) => {
        setData(prev => {
            return prev.map(e => {
                if(e.id === id) {
                    return {id: e.id, active: true}
                } else {
                    return {id: e.id, active: false}
                }
            })
        })
    }

    const closePlaylists = (e) => {


        if(e.target.parentElement === null) {

            setData(prev => prev.map(e => {
                return {id: e.id, active: false}
            }))

            return false
        }

        if(!e.target.classList.contains("button-playlists") && !e.target.parentElement.classList.contains("button-playlists")) {
            setData(prev => prev.map(e => {
                return {id: e.id, active: false}
            }))
        }

    }

    useEffect(() => {
        document.addEventListener("click", closePlaylists)

        return () => {
            document.removeEventListener("click", closePlaylists)
        }
    }, [])

    return (
        <div className="all-list-music">

            {data.map((e, i) => {

                return (
                    <ListMusic key={i} munculPlaylists={munculPlaylists} data={e}></ListMusic>
                )
            })}
        </div>

    )
}

export default AllListMusic