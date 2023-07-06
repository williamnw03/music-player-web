import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

// Import Font Icon
import { Trash3Fill, PencilFill } from "react-bootstrap-icons";

// Import CSS
import "./Playlist.css";
import { Link } from "react-router-dom";

function Playlist({
  playlists,
  playlist,
  changePlaylistsData,
  showAlertDeletePlaylist,
}) {
  // Playlist Name
  const [playlistName, setPlaylistName] = useState(playlist.name);

  const [disabledEditName, setDisabledEditName] = useState(true);

  // Changing name function
  const changeNameFunc = (e, playlist, playlists) => {
    const sanitizeConf = {
      allowedTags: [],
      allowedAttributes: {},
      disallowedTagsMode: "escape",
    };

    setPlaylistName(
      sanitizeHtml(
        e.target.textContent || `New Playlists ${playlist.id}`,
        sanitizeConf
      )
    );

    const playlistID = playlist.id;
    const newPlaylists = playlists.map((each) => {
      return each.id === playlistID
        ? {
            ...each,
            name: sanitizeHtml(
              e.target.textContent || `New Playlist ${playlistID}`,
              sanitizeConf
            ),
          }
        : each;
    });
    localStorage.setItem("playlists", JSON.stringify(newPlaylists));
    changePlaylistsData(newPlaylists);
  };

  // Playlist Name Change
  const titleChange = (e, playlist, playlists) => {
    changeNameFunc(e, playlist, playlists);
  };

  // Max Length
  const maxLength = (e, id) => {
    const playlistSelected = document.querySelector(`p.playlist-no-${id}`);
    const valueDiv = playlistSelected.textContent;

    if (valueDiv.length > 20) {
      playlistSelected.innerHTML = playlistName;
    } else {
      setPlaylistName(e.target.value);
    }
  };

  // Enter change
  const enterChange = (e, playlist, playlists) => {
    const playlistSelected = document.querySelector(
      `p.playlist-no-${playlist.id}`
    );

    if (e.key === "Enter") {
      changeNameFunc(e, playlist, playlists);
      setDisabledEditName(true);
    }
  };

  // Editable Playlist Name
  const EditStatus = (e) => {
    e.preventDefault();
    setDisabledEditName((prev) => !prev);
  };

  // Prevent Link
  const preventLink = (e) => {
    e.preventDefault();
  };

  return (
    <Link className="link-playlist" to={`/playlists/${playlist.id}`}>
      <div className="playlist-box">
        <div className="playlist-buttons">
          <div
            className="playlist-button delete-playlist"
            onClick={(e) => showAlertDeletePlaylist(e, playlist)}
          >
            <Trash3Fill />
          </div>

          <div
            className="playlist-button rename-playlist"
            style={
              disabledEditName
                ? {}
                : { backgroundColor: "#055E68", color: "#F5F5F5" }
            }
            onClick={EditStatus}
          >
            <PencilFill />
          </div>
        </div>

        <div className="image">
          <img
            src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${playlist.name}&backgroundColor=62A388`}
            alt={playlist.name}
          />
        </div>

        <div className="text-content">
          <ContentEditable
            disabled={disabledEditName}
            tagName="p"
            html={playlistName}
            className={`title-playlist playlist-no-${playlist.id}`}
            style={{
              backgroundColor: disabledEditName ? "transparent" : "#B9D2D2",
            }}
            onBlur={(e) => titleChange(e, playlist, playlists)}
            onChange={(e) => maxLength(e, playlist.id)}
            onKeyDown={(e) => enterChange(e, playlist, playlists)}
            onClick={preventLink}
          />

          <p className="number-playlist">#Playlist {playlist.id}</p>
        </div>
      </div>
    </Link>
  );
}

export default Playlist;
