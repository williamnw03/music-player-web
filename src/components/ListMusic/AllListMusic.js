// Import Components
import ListMusic from "./ListMusic";

// Import CSS
import "./AllListMusic.css";
import { useEffect } from "react";

function AllListMusic({
  data,
  playlists,
  addNewMusic,
  munculPlaylists,
  closePlaylists,
  changeMusic,
}) {
  const dataSongs = data.map((e, i) => {
    // Filter
    if (e.searchShow && e.genreShow) {
      return (
        <ListMusic
          key={i}
          munculPlaylists={munculPlaylists}
          data={e}
          changeMusic={changeMusic}
          playlists={playlists}
          addNewMusic={addNewMusic}
        ></ListMusic>
      );
    }
  });

  useEffect(() => {
    document.addEventListener("click", closePlaylists);

    return () => {
      document.removeEventListener("click", closePlaylists);
    };
  }, []);

  return (
    <>
      {dataSongs.filter((each) => each === undefined).length ===
      dataSongs.length ? (
        <h1 style={{ color: "#f5f5f5", textAlign: "center", marginTop: "2em" }}>
          NOT FOUND
        </h1>
      ) : (
        false
      )}
      <div className="all-list-music">
        {dataSongs.filter((each) => each === undefined).length ===
        dataSongs.length
          ? false
          : dataSongs}
      </div>
    </>
  );
}

export default AllListMusic;
