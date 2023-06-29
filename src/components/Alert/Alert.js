// Import CSS
import "./Alert.css"

function Alert({playlistDelete, removePlaylist, playlists, setPlaylists, closeAlert, alertDelete}) {

    return (
        <div className="alert-wrapper" style={{opacity: alertDelete ? "1" : "0", visibility: alertDelete ? "visible" : "hidden"}}>
            <div className="alert">
                <div className="message">
                    <p>Are you sure want to delete?</p>
                </div>

                <div className="buttons-answer">
                    <button className="yes-btn" onClick={() => removePlaylist(playlists, playlistDelete, setPlaylists)}>Yes</button>
                    <button className="no-btn" onClick={closeAlert}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Alert;