import { useEffect } from "react";

import AllListMusic from "../ListMusic/AllListMusic";
import GenreFilter from "../GenreFilter/GenreFilter";

function MainPage({setMusic, setCurrentMusic, data, setData, totalGenre, setTotalGenre, setCurrentGenre, setAlertDelete, playlists, setPlaylists}) {

    useEffect(() => {
        setAlertDelete(false)
    }, []);

    return (
        <>
        <GenreFilter totalGenre={totalGenre} setCurrentGenre={setCurrentGenre} setData={setData}></GenreFilter>
        <AllListMusic setMusic={setMusic} setCurrentMusic={setCurrentMusic} data={data} setData={setData} setTotalGenre={setTotalGenre} playlists={playlists} setPlaylists={setPlaylists}></AllListMusic>
        </>
    );  

}

export default MainPage;