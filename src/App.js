import { useState } from "react"

// Import Components
import Nav from "./components/Nav/Nav.js"
import MusicController from "./components/MusicController/MusicController.js"
import MainPage from "./components/MainPage/MainPage.js"
import Playlists from "./components/Playlists/Playlists.js"
import NotFound from "./components/NotFound/NotFound.js"

// Import CSS
import './App.css';

// Import Router
import {BrowserRouter, Routes, Route} from "react-router-dom"

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

  return (
    
    <BrowserRouter>
          <Nav searchValue={searchValue} setTheSearchValue={setTheSearchValue}/>
      <Routes>
        <Route path="/" element={<MainPage setMusic={setMusic} setCurrentMusic={setCurrentMusic} data={data} setData={setData} totalGenre={totalGenre} setTotalGenre={setTotalGenre} setCurrentGenre={setCurrentGenre}/>}/>

        <Route path="/playlists" element={<Playlists/>}/>

        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
          <MusicController music={music} setMusic={setMusic} currentMusic={currentMusic} setCurrentMusic={setCurrentMusic} data={data}></MusicController>
    </BrowserRouter>
    
  );
}

export default App;