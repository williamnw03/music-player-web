// Import Font Icon
import { useState } from "react"
import { PlayFill, PauseFill, VolumeUpFill, VolumeMuteFill, SkipStartFill, SkipEndFill, Repeat } from "react-bootstrap-icons"

// Import CSS
import "./MusicController.css"

function MusicController() {

    const [SoundSlider, setSoundSlider] = useState(false)

    const showSoundSlider = () => {
        setSoundSlider(prev => !prev)
    }

    return (
        <div className="music-controller">

            <div className="music-controller-wrapper">
                <div className="text-content">
                    <h3>Berak Tak Cebok</h3>
                    <p>Kufaku</p>
                </div>

                <div className="controller">
                    <div className="timeline-slider">
                        <p className="duration-start">0:00</p>
                        <input type="range" className="slider" max={100} min={0}/>
                        <p className="duration-end">3:00</p>
                    </div>

                    <div className="controller-button">
                        <button className="volume" onClick={showSoundSlider}><VolumeUpFill></VolumeUpFill></button>

                        <div className={`controller-sound ${SoundSlider ? "muncul" : ""}`}>
                            <input type="range" className="slider" max={100} min={0}/>
                        </div>

                        <button className="prev"><SkipStartFill></SkipStartFill></button>
                        <button className="play-pause"><PlayFill></PlayFill></button>
                        <button className="next"><SkipEndFill></SkipEndFill></button>
                        <button className="loop"><Repeat></Repeat></button>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default MusicController