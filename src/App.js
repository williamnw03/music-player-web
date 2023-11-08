import { useEffect, useState } from "react";

// Import Components
import Nav from "./components/Nav/Nav.js";
import MusicController from "./components/MusicController/MusicController.js";
import MainPage from "./components/MainPage/MainPage.js";
import Playlists from "./components/Playlists/Playlists.js";
import PlaylistList from "./components/PlaylistList/PlaylistList.js";
import NotFound from "./components/NotFound/NotFound.js";

// Import JSON DATA MUSIC
import musicData from "./data/music-data.json";

// Import CSS
import "./App.css";

// Import Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // Data
  const [data, setData] = useState(
    Array(50)
      .fill()
      .map((e, i) => ({
        id: i + 1,
        title: "",
        artist: [""],
        genre: [""],
        fileName: "",
        active: false,
        searchShow: true,
        genreShow: true,
      }))
  );

  // Data Playlists
  const [playlists, setPlaylists] = useState([]);

  // Alert
  const [alertDelete, setAlertDelete] = useState(false);

  // Genre
  const [totalGenre, setTotalGenre] = useState([]);
  const [currentGenre, setCurrentGenre] = useState([]);

  // Initiat Music
  const [music, setMusic] = useState(new Audio(""));

  // Current Music
  const [currentMusic, setCurrentMusic] = useState({
    id: "",
    title: "",
    artist: [""],
    genre: [""],
    fileName: "",
    active: false,
    searchShow: true,
    genreShow: true,
  });

  // Seachbar
  const [searchValue, setSearchValue] = useState("");

  // Music in Playlist
  const [dataInPlaylist, setDataInPlaylist] = useState([]);

  // Paly the music
  const [playMusic, setPlayMusic] = useState(true);

  // Loop in Playlist
  const [loopInPlaylist, setLoopInPlaylist] = useState(-1);

  // List Music to Loop in Playlist
  const [listMusicToLoop, setListMusicToLoop] = useState([]);

  // Playlist to Delete
  const [playlistDelete, setPlaylistDelete] = useState({});

  // Loading state
  const [loadingData, setLoadingData] = useState(true);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);

  const changePlayMusic = (bool) => {
    if (bool) {
      setPlayMusic(true);
    } else {
      setPlayMusic((prev) => !prev);
    }
  };

  // Change Current Music in Playlist
  const changeDataInPlaylist = (songs) => {
    setDataInPlaylist(songs);
  };

  // Change Loop in Playlist
  const changeLoopInPlaylist = (playlistID, listSongs) => {
    if (playlistID == loopInPlaylist) {
      setLoopInPlaylist(-1);
      setListMusicToLoop([]);
    } else {
      setLoopInPlaylist(playlistID);
      setListMusicToLoop(data.filter((e) => listSongs.includes(e.id)));
    }
  };

  // Searchbar Filter
  const changeTheSearchValue = (ev) => {
    setSearchValue(ev.target.value);

    setData((prev) => {
      return prev.map((e) => {
        if (e.title.toLowerCase().includes(ev.target.value.toLowerCase())) {
          return { ...e, searchShow: true };
        } else {
          return { ...e, searchShow: false };
        }
      });
    });
  };

  // Choose Genres
  const activeGenre = (e) => {
    let newGenres = [];
    const genre = e.target.dataset.genre;

    if (currentGenre.includes(genre)) {
      newGenres = currentGenre.filter((e) => {
        if (e !== genre) {
          return e;
        }
      });
    } else {
      newGenres = [...currentGenre, e.target.dataset.genre];
    }

    setCurrentGenre(newGenres);

    // Filter Genre
    setData((prev) => {
      if (newGenres.length === 0) {
        return prev.map((e) => {
          return { ...e, genreShow: true };
        });
      }

      return prev.map((e) => {
        let count = 0;
        e.genre.forEach((genre) => {
          if (newGenres.includes(genre)) {
            count++;
          }
        });

        return count === 0
          ? { ...e, genreShow: false }
          : { ...e, genreShow: true };
      });
    });

    e.target.classList.toggle("active-genre");
  };

  // Add New Music to Playlist
  const addNewMusic = (playlist, playlists, musicID) => {
    const newPlaylists = [...playlists];

    const newestPlaylists = newPlaylists.map((each) => {
      const newPlaylist = { ...each };
      if (newPlaylist.id === playlist.id) {
        if (!newPlaylist.songs.find((song) => song === musicID)) {
          newPlaylist.songs.push(musicID);
        } else {
          // Remove Music
          newPlaylist.songs.splice(newPlaylist.songs.indexOf(musicID), 1);
        }
      }

      return newPlaylist;
    });

    setPlaylists(newestPlaylists);
    localStorage.setItem("playlists", JSON.stringify(newestPlaylists));
  };

  // Delete Music in Playlist
  const removeMusicInPlaylist = (playlists, playlist, musicID) => {
    const newPlaylists = [...playlists];

    const newestPlaylists = newPlaylists.map((each) => {
      const newPlaylist = { ...each };
      if (newPlaylist.id === playlist.id) {
        if (newPlaylist.songs.find((song) => song === musicID)) {
          newPlaylist.songs.splice(newPlaylist.songs.indexOf(musicID), 1);
        }
      }

      return newPlaylist;
    });

    localStorage.setItem("playlists", JSON.stringify(newestPlaylists));
    setPlaylists(newestPlaylists);
    setAlertDelete(false);
  };

  const changeAlertDelete = () => {
    setAlertDelete(true);
  };

  // Show Playlists
  const munculPlaylists = (id) => {
    setData((prev) => {
      return prev.map((e) => {
        if (e.id === id) {
          // Close Playlists
          if (e.active) {
            return { ...e, active: false };
          }
          return { ...e, active: true };
        } else {
          return { ...e, active: false };
        }
      });
    });
  };

  // Close Playlists
  const closePlaylists = (e) => {
    if (e.target.parentElement === null) {
      setData((prev) =>
        prev.map((e) => {
          return { ...e, active: false };
        })
      );

      return false;
    }

    if (
      !e.target.classList.contains("button-playlists") &&
      !e.target.parentElement.classList.contains("button-playlists")
    ) {
      setData((prev) =>
        prev.map((e) => {
          return { ...e, active: false };
        })
      );
    }
  };

  const changeMusicTemplate = (fileName, data) => {
    setMusic((prev) => {
      const newAudio = prev;
      newAudio.src = `/music/${fileName}.mp3`;
      return newAudio;
    });
    setCurrentMusic(data);
    setPlayMusic(true);
  };

  // Change Music
  const changeMusic = (e, fileName, data) => {
    if (
      e.target.classList.contains("button-playlists") ||
      e.target.parentElement.classList.contains("button-playlists") ||
      e.target.classList.contains("playlist")
    ) {
      return false;
    }
    changeMusicTemplate(fileName, data);
  };

  // Change Music In Playlist
  const changeMusicInPlaylist = (e, fileName, data) => {
    if (
      e.target.classList.contains("button-delete") ||
      e.target.parentElement.classList.contains("button-delete")
    ) {
      return false;
    }
    changeMusicTemplate(fileName, data);
  };

  // Change Playlists Data
  const changePlaylistsData = (newData) => {
    setPlaylists(newData);
  };

  // Alert Delete Playlist
  const showAlertDeletePlaylist = (e, playlist) => {
    e.preventDefault();
    setAlertDelete(true);
    setPlaylistDelete(playlist);
  };

  // Add New Playlist
  const addPlaylist = (playlists) => {
    const newPlaylists = [...playlists];

    const emptyPlaylist = (id) => {
      const playlist = {
        id: id,
        name: `New Playlist ${id}`,
        songs: [],
      };

      return playlist;
    };

    if (playlists.length === 0) {
      const playlist = emptyPlaylist(1);
      newPlaylists.push(playlist);
    } else if (playlists.length === 3) {
      return false;
    } else {
      const playlistID = [];
      playlists.forEach((playlist) => playlistID.push(playlist.id));

      if (!playlistID.includes(1)) {
        const playlist = emptyPlaylist(1);
        newPlaylists.push(playlist);
      } else if (!playlistID.includes(2)) {
        const playlist = emptyPlaylist(2);
        newPlaylists.push(playlist);
      } else {
        const playlist = emptyPlaylist(3);
        newPlaylists.push(playlist);
      }
    }

    localStorage.setItem("playlists", JSON.stringify(newPlaylists));
    setPlaylists(newPlaylists);
  };

  // Remove Playlist
  const removePlaylist = (playlists, playlist) => {
    const playlistID = playlist.id;
    const newPlaylists = playlists.filter(
      (playlist) => playlist.id !== playlistID
    );
    localStorage.setItem("playlists", JSON.stringify(newPlaylists));
    setPlaylists(newPlaylists);
    setAlertDelete(false);
  };

  // Close Alert
  const closeAlert = () => {
    setAlertDelete(false);
  };

  const musicNextPrev = (id, data, btn) => {
    let musicData = data;
    let music = {};

    if (loopInPlaylist !== -1) {
      if (listMusicToLoop.length) {
        musicData = listMusicToLoop;
      }
    }

    musicData.forEach((e, i) => {
      if (e.id === id) {
        if (btn) {
          music = musicData.length - 1 === i ? musicData[0] : musicData[i + 1];
        } else {
          music = i === 0 ? musicData[musicData.length - 1] : musicData[i - 1];
        }
      }
    });

    if (!Object.keys(music).length) {
      music = musicData[0];
    }

    setMusic((prev) => {
      const newAudio = prev;
      newAudio.src = `/music/${music.fileName}.mp3`;
      return newAudio;
    });
    setCurrentMusic(music);
  };

  useEffect(() => {
    // Data Music JSON
    setData(
      musicData.map((e) => {
        return { ...e, active: false, genreShow: true, searchShow: true };
      })
    );

    const genres = [];
    musicData.forEach((e) => {
      e.genre.forEach((e2) => {
        if (!genres.includes(e2)) {
          genres.push(e2);
        }
      });
    });

    setTotalGenre(genres);

    // Playlist
    if (!JSON.parse(localStorage.getItem("playlists"))) {
      localStorage.setItem("playlists", JSON.stringify([]));
      setPlaylists(JSON.parse(localStorage.getItem("playlists")));
    } else {
      setPlaylists(JSON.parse(localStorage.getItem("playlists")));
    }

    // Loading
    setLoadingData(false);
    setLoadingPlaylists(false);
  }, []);

  return (
    <BrowserRouter>
      <Nav
        searchValue={searchValue}
        changeTheSearchValue={changeTheSearchValue}
      />
      <div
        className="black-screen"
        style={{
          opacity: alertDelete ? "0.9" : "0",
          visibility: alertDelete ? "visible" : "hidden",
        }}
      ></div>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              data={data}
              totalGenre={totalGenre}
              closeAlert={closeAlert}
              playlists={playlists}
              activeGenre={activeGenre}
              addNewMusic={addNewMusic}
              munculPlaylists={munculPlaylists}
              closePlaylists={closePlaylists}
              changeMusic={changeMusic}
              loadingData={loadingData}
              loadingPlaylists={loadingPlaylists}
            />
          }
        />

        <Route path="/playlists">
          <Route
            index
            element={
              <Playlists
                alertDelete={alertDelete}
                playlists={playlists}
                changePlaylistsData={changePlaylistsData}
                addPlaylist={addPlaylist}
                removePlaylist={removePlaylist}
                closeAlert={closeAlert}
                playlistDelete={playlistDelete}
                showAlertDeletePlaylist={showAlertDeletePlaylist}
                loadingPlaylists={loadingPlaylists}
              />
            }
          />

          <Route
            path="/playlists/:playlistID"
            element={
              <PlaylistList
                data={data}
                playlists={playlists}
                changeMusicInPlaylist={changeMusicInPlaylist}
                removeMusicInPlaylist={removeMusicInPlaylist}
                closeAlert={closeAlert}
                alertDelete={alertDelete}
                changeAlertDelete={changeAlertDelete}
                dataInPlaylist={dataInPlaylist}
                changeDataInPlaylist={changeDataInPlaylist}
                loopInPlaylist={loopInPlaylist}
                changeLoopInPlaylist={changeLoopInPlaylist}
                loadingData={loadingData}
                loadingPlaylists={loadingPlaylists}
              />
            }
          />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <MusicController
        playMusic={playMusic}
        changePlayMusic={changePlayMusic}
        music={music}
        currentMusic={currentMusic}
        data={data}
        musicNextPrev={musicNextPrev}
        loopInPlaylist={loopInPlaylist}
        playlists={playlists}
      ></MusicController>
    </BrowserRouter>
  );
}

export default App;
