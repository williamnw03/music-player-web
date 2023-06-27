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
    "show": true
  })))

  // Total Genre
  const [totalGenre, setTotalGenre] = useState([])

  console.log(totalGenre)

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
    "show": true
  })

  // Seachbar
  const [searchValue, setSearchValue] = useState("")

  const setTheSearchValue = (ev) => {
    setSearchValue(ev.target.value)

    setData(prev => {
        return prev.map(e => {
        if(e.title.toLowerCase().includes(ev.target.value.toLowerCase())){
          return {...e, show: true}
        } else {
          return {...e, show: false}
        }
      })
    })
  }

  // Genre Filter
  const setTheGenreFilter = (ev) => {
    setData(prev => {
      return prev.map(e => {
      if(e.genre.includes(ev.target.value)){
        return {...e, show: true}
      } else {
        return {...e, show: false}
      }
    })
  })
  }

  return (
    <div className="App">
      <Nav searchValue={searchValue} setTheSearchValue={setTheSearchValue}/>
      <GenreFilter totalGenre={totalGenre}></GenreFilter>
      <AllListMusic setMusic={setMusic} setCurrentMusic={setCurrentMusic} data={data} setData={setData} setTotalGenre={setTotalGenre}></AllListMusic>
      <MusicController music={music} currentMusic={currentMusic}></MusicController>
    </div>
  );
}

export default App;
