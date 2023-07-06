import ScaleLoader from "react-spinners/ScaleLoader";

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
  loadingData,
  loadingPlaylists,
}) {
  const dataSongs = data.map((e, i) => {
    // Filter
    if (e.searchShow && e.genreShow) {
      return (
        <ListMusic
          key={e.id}
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
      {dataSongs.filter((each) => each === undefined).length ===
      dataSongs.length ? (
        <h3
          style={{
            color: "#f5f5f5",
            textAlign: "center",
            marginTop: "2em",
            fontSize: "2em",
          }}
        >
          NOT FOUND
        </h3>
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
