import { useEffect, useState } from "react"

// Import Components
import Nav from "./components/Nav/Nav.js"
import MusicController from "./components/MusicController/MusicController.js"
import MainPage from "./components/MainPage/MainPage.js"
import Playlists from "./components/Playlists/Playlists.js"
import PlaylistList from "./components/PlaylistList/PlaylistList.js"
import NotFound from "./components/NotFound/NotFound.js"

import FetchDataMusic from "./components/FetchDataMusic/FetchDataMusic.js"

// Import JSON DATA MUSIC
import musicData from "./data/music-data.json"

// Import CSS
import './App.css';

// Import Router
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom"

function App() {
  
  // Data
  const [data, setData] = useState(Array(50).fill().map((e, i) => ({
    "id": i+1,
    "title": "",
    "artist": [""],
    "genre": [""],
    "fileName": "",
    "active": false,
    "searchShow": true,
    "genreShow": true
  })))

  // Data Playlists
  const [playlists, setPlaylists] = useState([])

  // Alert
  const [alertDelete, setAlertDelete] = useState(false)

  // Genre
  const [totalGenre, setTotalGenre] = useState([])
  const [currentGenre, setCurrentGenre] = useState([])

  // Initiat Music
  const [music, setMusic] = useState(new Audio(""))

  // Current Music
  const [currentMusic, setCurrentMusic] = useState({
    "id": "",
    "title": "",
    "artist": [""],
    "genre": [""],
    "fileName": "",
    "active": false,
    "searchShow": true,
    "genreShow": true
  })

  // Seachbar
  const [searchValue, setSearchValue] = useState("")

  // Searchbar Filter
  const setTheSearchValue = (ev) => {
    setSearchValue(ev.target.value)

    setData(prev => {
        return prev.map(e => {
        if(e.title.toLowerCase().includes(ev.target.value.toLowerCase())){
          return {...e, searchShow: true}
        } else {
          return {...e, searchShow: false}
        }
      })
    })
  }

  useEffect(() => {

    // Data Music JSON
    setData(musicData.map(e => {
        return {...e, active: false, genreShow: true, searchShow: true}
    }))

    const genres = []
    musicData.forEach(e => {
        e.genre.forEach(e2 => {
            if(!genres.includes(e2)){
                genres.push(e2)
            }
        })
    });

    setTotalGenre(genres)

    // Playlist 
    if(!JSON.parse(localStorage.getItem("playlists"))){
        localStorage.setItem("playlists", JSON.stringify([]))
        setPlaylists(JSON.parse(localStorage.getItem("playlists")))
    } else {
        setPlaylists(JSON.parse(localStorage.getItem("playlists")))
    }
  }, [])


  return (
    
    <BrowserRouter>
          <Nav searchValue={searchValue} setTheSearchValue={setTheSearchValue}/>
          <div className="black-screen" style={{opacity: alertDelete ? "0.9" : "0", visibility: alertDelete ? "visible" : "hidden"}}></div>
      <Routes>
        <Route path="/" element={<MainPage setMusic={setMusic} setCurrentMusic={setCurrentMusic} data={data} setData={setData} totalGenre={totalGenre} setTotalGenre={setTotalGenre} setCurrentGenre={setCurrentGenre} setAlertDelete={setAlertDelete} playlists={playlists} setPlaylists={setPlaylists}/>}/>

        <Route path="/playlists" element={<Playlists alertDelete={alertDelete} setAlertDelete={setAlertDelete} playlists={playlists} setPlaylists={setPlaylists}/>}/>

        <Route path="/playlists/:playlistID" element={<PlaylistList data={data} playlists={playlists} setPlaylists={setPlaylists} setMusic={setMusic} setCurrentMusic={setCurrentMusic}/>}></Route>

        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
          <MusicController music={music} setMusic={setMusic} currentMusic={currentMusic} setCurrentMusic={setCurrentMusic} data={data}></MusicController>
    </BrowserRouter>
    
  );
}

export default App;