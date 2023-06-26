// Import Font Icon
import { useEffect, useState } from "react"
import { PlayFill, PauseFill, VolumeUpFill, VolumeMuteFill, SkipStartFill, SkipEndFill, Repeat } from "react-bootstrap-icons"

// Import CSS
import "./MusicController.css"

function MusicController() {
    const [music, setMusic] = useState(new Audio("../music/A Flute's Mourning - Aakash Gandhi.mp3")
    )
    const [musicDuration, setMusicDuration] = useState(0)
    const [musicCurrentDuration, setMusicCurrentDuration] = useState(0)
    music.preload = "metadata"

    const [SoundSlider, setSoundSlider] = useState(false)
    const [playMusic, setPlayMusic] = useState(false)
    const [voluemOff, setVolumeOff] = useState(false)
    const [volume, setVolume] = useState(100)
    const [loop, setLoop] = useState(false)

    const showSoundSlider = () => setSoundSlider(prev => !prev)

    const playTheMusic = () => setPlayMusic(prev => !prev)
    
    const setTheVolume = (e, music) => {
        music.volume = e.target.value/100
        setVolume(e.target.value)
        e.target.value === "0" ? setVolumeOff(true) : setVolumeOff(false)
    }

    const setTheMusicCurrentDuration = (e, music) => {
        setMusicCurrentDuration(e.target.value)
        music.currentTime = parseFloat(e.target.value)
    }

    const setTheLoop = (music) => {
        console.log(music.loop)
        setLoop(prev => !prev)
    }

    const checkMusicLoaded = (e) => {
        setMusicDuration(music.duration)
        setMusicCurrentDuration(music.currentTime)
    }

    const checkMusicTime = (e) => {
        setMusicCurrentDuration(music.currentTime)
    }

    // Music Play
    if(playMusic){
        music.play()
        
    } else {
        music.pause()
    }

    useEffect(() => {
        music.addEventListener("loadeddata", checkMusicLoaded)
        music.addEventListener("timeupdate", checkMusicTime)

        return () => {
            music.removeEventListener("loadeddata", checkMusicLoaded)
            music.removeEventListener("timeupdate", checkMusicTime)
        }
    }, [])

    return (
        <div className="music-controller">

            <div className="music-controller-wrapper">
                <div className="text-content">
                    <h3>Berak Tak Cebok</h3>
                    <p>Kufaku</p>
                </div>

                <div className="controller">
                    <div className="timeline-slider">
                        <p className="duration-start">{`${parseInt(musicCurrentDuration/60)}:${parseInt(musicCurrentDuration%60)}`}</p>
                        <input type="range" className="slider" max={musicDuration} min={0} value={musicCurrentDuration} onChange={(e) => setTheMusicCurrentDuration(e, music)}/>
                        <p className="duration-end">{`${parseInt(musicDuration/60)}:${parseInt(musicDuration%60)}`}</p>
                    </div>

                    <div className="controller-button">
                        <button className="volume" onClick={showSoundSlider}>{voluemOff ? <VolumeMuteFill/> :  <VolumeUpFill/>}</button>

                        <div className={`controller-sound ${SoundSlider ? "muncul" : ""}`}>
                            <input type="range" className="slider" max={100} min={0} value={volume} onChange={(e) => setTheVolume(e, music)}/>
                        </div>

                        <button className="prev"><SkipStartFill></SkipStartFill></button>
                        <button className="play-pause" onClick={playTheMusic}>{playMusic ? <PauseFill/> : <PlayFill/>}</button>
                        <button className="next"><SkipEndFill></SkipEndFill></button>
                        <button className="loop" onClick={() => setTheLoop(music)} style={{opacity: loop ? 1 : 0.3}}><Repeat></Repeat></button>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default MusicController