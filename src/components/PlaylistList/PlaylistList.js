import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

// Import Font Icon
import { Repeat } from "react-bootstrap-icons";

// Import Components
import EachPlaylistList from "./EachPlaylistList";
import Alert from "../Alert/Alert";

// Import CSS
import "./PlaylistList.css";

function PlaylistList({
  data,
  playlists,
  changeMusicInPlaylist,
  showAlertDeleteMusicInPlaylist,
  removeMusicInPlaylist,
  closeAlert,
  alertDelete,
  changeAlertDelete,
  dataInPlaylist,
  changeDataInPlaylist,
  loopInPlaylist,
  changeLoopInPlaylist,
  loadingData,
  loadingPlaylists,
}) {
  const navigate = useNavigate();

  // Playlist ID
  const { playlistID } = useParams();

  // Current Playlist
  const [playlistForMusic, setPlaylistForMusic] = useState(
    playlists.find((playlist) => playlist.id == playlistID)
  );

  // Music in PLaylist to Delete
  const [musicInPlaylistDelete, setMusicInPlaylistDelete] = useState(-1);

  const changeMusicInPlaylistDelete = (musicID) => {
    setMusicInPlaylistDelete(musicID);
  };

  useEffect(() => {
    const playlistsDataLocalstorage = JSON.parse(
      localStorage.getItem("playlists")
    );

    let currentPlaylist = {};

    if (playlistsDataLocalstorage.length !== 0) {
      if (
        !playlistsDataLocalstorage.find((playlist) => playlist.id == playlistID)
      ) {
        navigate("/playlists");
      } else {
        playlistsDataLocalstorage.forEach((e) => {
          if (e.id == playlistID) {
            currentPlaylist = e;
          }
        });

        changeDataInPlaylist(currentPlaylist.songs);
        setPlaylistForMusic(
          playlists.find((playlist) => playlist.id == playlistID)
        );
      }
    } else {
      navigate("/playlists");
    }
  }, [playlists]);

  return (
    <>
      <Alert
        itemToDelete={"music-playlist"}
        musicInPlaylistDelete={musicInPlaylistDelete}
        removeMusicInPlaylist={removeMusicInPlaylist}
        playlists={playlists}
        closeAlert={closeAlert}
        alertDelete={alertDelete}
        playlistID={playlistID}
      />

      <div className="playlist-list-wrapper">
        <h1 className="title-page">
          {playlistForMusic ? playlistForMusic.name : "Loading..."}
        </h1>
        <p className="subtitle-page">
          Total{" "}
          {playlistForMusic ? playlistForMusic.songs.length : "Loading..."}{" "}
          Songs/Music
        </p>
        <p
          className="loop-this-playlist"
          style={{ opacity: loopInPlaylist == playlistID ? 1 : 0.3 }}
          onClick={() => changeLoopInPlaylist(playlistID, dataInPlaylist)}
        >
          <Repeat /> Loop This Playlist
        </p>
        <ScaleLoader
          color="#b9d2d2"
          loading={loadingData && loadingPlaylists}
          width={20}
          height={70}
          cssOverride={{
            display: "block",
            width: "max-content",
            margin: "0 auto",
            marginTop: "2em",
          }}
        />
        <div className="all-list-music-playlist">
          {dataInPlaylist.length === 0
            ? false
            : dataInPlaylist.map((e, i) => {
                // Filter
                return (
                  <EachPlaylistList
                    key={e}
                    data={data}
                    musicID={e}
                    changeMusicInPlaylist={changeMusicInPlaylist}
                    playlists={playlists}
                    showAlertDeleteMusicInPlaylist={
                      showAlertDeleteMusicInPlaylist
                    }
                    changeAlertDelete={changeAlertDelete}
                    changeMusicInPlaylistDelete={changeMusicInPlaylistDelete}
                  ></EachPlaylistList>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default PlaylistList;
