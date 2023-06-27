import { useState } from "react";

// Import Components
import Nav from "./components/Nav/Nav.js"
import GenreFilter from "./components/GenreFilter/GenreFilter.js"
import AllListMusic from "./components/ListMusic/AllListMusic.js";
import MusicController from "./components/MusicController/MusicController.js";

// Import CSS
import './App.css';

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
    <div className="App">
      <Nav searchValue={searchValue} setTheSearchValue={setTheSearchValue}/>
      <GenreFilter totalGenre={totalGenre} setCurrentGenre={setCurrentGenre} setData={setData}></GenreFilter>
      <AllListMusic setMusic={setMusic} setCurrentMusic={setCurrentMusic} data={data} setData={setData} setTotalGenre={setTotalGenre}></AllListMusic>
      <MusicController music={music} setMusic={setMusic} currentMusic={currentMusic} setCurrentMusic={setCurrentMusic} data={data}></MusicController>
    </div>
  );
}

export default App;