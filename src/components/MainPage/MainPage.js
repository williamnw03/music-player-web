import { useEffect } from "react";

import AllListMusic from "../ListMusic/AllListMusic";
import GenreFilter from "../GenreFilter/GenreFilter";

function MainPage({
  data,
  totalGenre,
  playlists,
  activeGenre,
  addNewMusic,
  munculPlaylists,
  closePlaylists,
  changeMusic,
  closeAlert,
}) {
  useEffect(() => closeAlert(), []);

  return (
    <>
      <GenreFilter
        totalGenre={totalGenre}
        activeGenre={activeGenre}
      ></GenreFilter>
      <AllListMusic
        data={data}
        playlists={playlists}
        addNewMusic={addNewMusic}
        munculPlaylists={munculPlaylists}
        closePlaylists={closePlaylists}
        changeMusic={changeMusic}
      ></AllListMusic>
    </>
  );
}

export default MainPage;
