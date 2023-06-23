// Import Components
import Nav from "./components/Nav/Nav.js"
import GenreFilter from "./components/GenreFilter/GenreFilter.js"
import ListMusic from "./components/ListMusic/ListMusic.js";

// Import CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav/>
      <GenreFilter></GenreFilter>
    </div>
  );
}

export default App;
