// Import Font Icon
import { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";

// import CSS
import "./EachPlaylistList.css";

function EachPlaylistList({
  data,
  musicID,
  changeMusicInPlaylist,
  changeAlertDelete,
  changeMusicInPlaylistDelete,
}) {
  // Alert Delete Music in Playlist
  const showAlertDeleteMusicInPlaylist = (musicID) => {
    changeAlertDelete();
    changeMusicInPlaylistDelete(musicID);
  };

  const [musicSelected, setMusicSelected] = useState(
    data.find((e) => e.id == musicID)
  );

  // Artists
  let artists = "";
  musicSelected.artist.forEach(
    (e, i) => (artists += i + 1 === musicSelected.artist.length ? e : `${e}, `)
  );

  return (
    <div
      className="list-music-playlist"
      onClick={(e) =>
        changeMusicInPlaylist(e, musicSelected.fileName, { ...musicSelected })
      }
    >
      <div className="image">
        <img
          src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${musicSelected.title}&backgroundColor=62A388`}
          alt={musicSelected.title}
        />
      </div>

      <div className="text-content">
        <p className="title-music">{musicSelected.title}</p>
        <p className="artist-music">{artists}</p>
        <p className="genre-music">{musicSelected.genre}</p>
      </div>

      <div className="delete-button">
        <div
          className="button-delete"
          onClick={() => showAlertDeleteMusicInPlaylist(musicSelected.id)}
        >
          <TrashFill className="button-delete" />
        </div>
      </div>
    </div>
  );
}

export default EachPlaylistList;
