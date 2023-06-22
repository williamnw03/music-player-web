// Import Components
import ListMusic from "../ListMusic/ListMusic.js"


// Import Font Icon
import { HouseDoorFill, MusicNoteList,ThreeDotsVertical } from "react-bootstrap-icons"

// Import CSS
import "./Nav.css"



function Nav() {

    return (
        <div className="nav-padding">
            <nav className="navbar">
                <div className="searchbar-section">
                    <input type="text" className="searchbar" placeholder="Search..."/>
                </div>

                <div className="navigation-section">
                    <ul>
                        <li className="home-button"> <a href="#"><HouseDoorFill/></a> </li>
                        <li className="playlist-button"> <a href="#"><MusicNoteList/></a> </li>
                    </ul>
                </div>
            </nav>
        </div>
    )

}

export default Nav