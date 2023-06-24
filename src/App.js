// Import Components
import Nav from "./components/Nav/Nav.js"
import GenreFilter from "./components/GenreFilter/GenreFilter.js"
import AllListMusic from "./components/ListMusic/AllListMusic.js";
import MusicController from "./components/MusicController/MusicController.js";

// Import CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav/>
      <GenreFilter></GenreFilter>
      <AllListMusic></AllListMusic>
      <MusicController></MusicController>
    </div>
  );
}

export default App;
