
// Import Components
import ListMusic from "./ListMusic"

// Import CSS
import "./AllListMusic.css"
import { useEffect, useState } from "react"

function AllListMusic({data, playlists, addNewMusic, munculPlaylists, closePlaylists, changeMusic}) {

    useEffect(() => {

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
                                <ListMusic key={i} munculPlaylists={munculPlaylists} data={e} changeMusic={changeMusic} playlists={playlists} addNewMusic={addNewMusic}></ListMusic>
                            )
                        }
                    }
                })}
            </div>
        </>

    )
}

export default AllListMusic