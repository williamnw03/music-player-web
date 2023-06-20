


// Import Font Icon
import { HouseDoorFill, MusicNoteList,ThreeDotsVertical } from "react-bootstrap-icons"



function Nav() {

    return (
        <div className="nav-padding">
            <nav className="navbar">
                <div className="searchbar-section">
                    <input type="text" className="searchbar" placeholder="Search..."/>

                    <div className="dropdown">
                        <div className="list-music">
                            <div className="text-content">
                                <p className="title-music">Berak Tak Cebok</p>
                                <p className="artist-music">Kufaku</p>
                            </div>

                            <div className="playlist-button">
                            <div className="button"><ThreeDotsVertical/></div>

                                <div className="playlists">
                                    <div className="playlist">Playlist #1</div>
                                    <div className="playlist">Playlist #2</div>
                                    <div className="playlist">Playlist #3</div>
                                </div>
                            </div>
                        </div>

                        <div className="list-music">
                            <div className="text-content">
                                <p className="title-music">Berak Tak Cebok</p>
                                <p className="artist-music">Kufaku</p>
                            </div>

                            <div className="playlist-button">
                                <div className="button"><ThreeDotsVertical/></div>

                                <div className="playlists">
                                    <div className="playlist">Playlist #1</div>
                                    <div className="playlist">Playlist #2</div>
                                    <div className="playlist">Playlist #3</div>
                                </div>
                            </div>
                        </div>
                    </div>
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