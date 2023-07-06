import ScaleLoader from "react-spinners/ScaleLoader";

// Impprt Components
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import Alert from "../Alert/Alert";

// Import CSS
import "./Playlists.css";

function Playlists({
  playlists,
  playlistName,
  changePlaylistsData,
  titleChange,
  showAlertDeletePlaylist,
  addPlaylist,
  removePlaylist,
  closeAlert,
  playlistDelete,
  alertDelete,
  loadingPlaylists,
}) {
  return (
    <>
      <Alert
        itemToDelete={"playlist"}
        playlistDelete={playlistDelete}
        removePlaylist={removePlaylist}
        playlists={playlists}
        closeAlert={closeAlert}
        alertDelete={alertDelete}
      />
      <div className="playlists-wrapper">
        <h1 className="title-page">Your Playlists</h1>
        <p className="subtitle-page">Up to 3 Playlists</p>
        <ScaleLoader
          color="#b9d2d2"
          loading={loadingPlaylists}
          width={20}
          height={70}
          cssOverride={{
            display: "block",
            width: "max-content",
            margin: "0 auto",
            marginTop: "2em",
          }}
        />
        <div className="all-playlists">
          {playlists.length >= 1
            ? playlists.map((playlist) => {
                return (
                  <Playlist
                    key={playlist.id}
                    playlists={playlists}
                    changePlaylistsData={changePlaylistsData}
                    playlist={playlist}
                    titleChange={titleChange}
                    showAlertDeletePlaylist={showAlertDeletePlaylist}
                    playlistName={playlistName}
                  ></Playlist>
                );
              })
            : false}
          {playlists.length <= 2 ? (
            <EmptyPlaylist
              addPlaylist={() => addPlaylist(playlists)}
            ></EmptyPlaylist>
          ) : (
            false
          )}
        </div>
      </div>
    </>
  );
}

export default Playlists;
