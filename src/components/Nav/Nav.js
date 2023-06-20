


// Import Font Icon
import { HouseDoorFill, MusicNoteList } from "react-bootstrap-icons"



function Nav() {

    return (
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
    )

}

export default Nav