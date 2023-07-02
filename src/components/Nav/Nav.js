import { useState } from "react"

// Import Font Icon
import { HouseDoorFill, MusicNoteList } from "react-bootstrap-icons"

// Import CSS
import "./Nav.css"

// Import Router
import { Link, useLocation } from "react-router-dom"

function Nav({searchValue, changeTheSearchValue}) {
    const currentPath = useLocation()

    return (
        <div className="nav-padding">
            <nav className="navbar">
                {currentPath.pathname === "/" ? <div className="searchbar-section">
                    <input type="text" className="searchbar" value={searchValue} placeholder="Search..." onChange={changeTheSearchValue}/>
                </div> : false}

                <div className="navigation-section">
                    <ul className={`${currentPath.pathname !== "/" ? "sidebar-active-playlist" : ""}`}>
                        <li className="home-button"> <Link to="/"><HouseDoorFill/></Link> </li>
                        <li className="playlist-button"> <Link to="/playlists"><MusicNoteList/></Link> </li>
                    </ul>
                </div>
            </nav>
        </div>
    )

}

export default Nav