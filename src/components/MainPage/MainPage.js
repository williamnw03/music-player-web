import { useEffect } from "react";

import AllListMusic from "../ListMusic/AllListMusic";
import GenreFilter from "../GenreFilter/GenreFilter";

function MainPage({data, totalGenre, setAlertDelete, playlists, activeGenre, addNewMusic, munculPlaylists, closePlaylists, changeMusic, closeTheAlert}) {

    useEffect(() => closeTheAlert(), []);

    return (
        <>
        <GenreFilter totalGenre={totalGenre} activeGenre={activeGenre}></GenreFilter>
        <AllListMusic data={data} playlists={playlists} addNewMusic={addNewMusic} munculPlaylists={munculPlaylists} closePlaylists={closePlaylists} changeMusic={changeMusic}></AllListMusic>
        </>
    );  

}

export default MainPage;