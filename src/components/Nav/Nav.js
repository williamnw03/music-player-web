import { useState } from "react"

// Import Font Icon
import { HouseDoorFill, MusicNoteList, ThreeDotsVertical } from "react-bootstrap-icons"

// Import CSS
import "./Nav.css"

function Nav({searchValue, setTheSearchValue}) {
    const [activePlaylist, setActivePlaylist] = useState(false)

    // Sidebar Active Page
    const sidebarClick = () => setActivePlaylist(prev => !prev)

    return (
        <div className="nav-padding">
            <nav className="navbar">
                <div className="searchbar-section">
                    <input type="text" className="searchbar" value={searchValue} placeholder="Search..." onChange={setTheSearchValue}/>
                </div>

                <div className="navigation-section">
                    <ul className={`${activePlaylist ? "sidebar-active-playlist" : ""}`}>
                        <li className="home-button"> <a href="#" onClick={sidebarClick}><HouseDoorFill/></a> </li>
                        <li className="playlist-button"> <a href="#" onClick={sidebarClick}><MusicNoteList/></a> </li>
                    </ul>
                </div>
            </nav>
        </div>
    )

}

export default Nav