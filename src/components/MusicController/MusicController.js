// Import Font Icon
import { useEffect, useState } from "react"
import { PlayFill, PauseFill, VolumeUpFill, VolumeMuteFill, SkipStartFill, SkipEndFill, Repeat } from "react-bootstrap-icons"
import { useLocation } from "react-router-dom"

// Import CSS
import "./MusicController.css"

function MusicController({music, setMusic, currentMusic, setCurrentMusic, data}) {

    const [musicDuration, setMusicDuration] = useState(0)
    const [musicCurrentDuration, setMusicCurrentDuration] = useState(0)

    const [SoundSlider, setSoundSlider] = useState(false)
    const [playMusic, setPlayMusic] = useState(true)
    const [voluemOff, setVolumeOff] = useState(false)
    const [volume, setVolume] = useState(100)
    const [loop, setLoop] = useState(false)

    const showSoundSlider = () => setSoundSlider(prev => !prev)

    const playTheMusic = () => {
        if(currentMusic.title !== ""){
            setPlayMusic(prev => !prev)
        }
    }

    const musicNextPrev = (id, data, btn, setMusic, setCurrentMusic) => {
        let music = {}
        data.forEach((e, i) => {
            if(e.id === id){
                if(btn){
                    music = data.length-1 === i ? data[0] : data[i+1]
                } else {
                    music = i === 0 ? data[data.length-1] : data[i-1]
                }
            }
        })

        setMusic(prev => {
            const newAudio = prev
            newAudio.src = `/music/${music.fileName}.mp3`
            console.log(newAudio)
            console.log(newAudio.src)
            return newAudio
        }) 
        setCurrentMusic(music)
    }

    const playTheNextMusic = (e, id, data, setMusic, setCurrentMusic) => {
        musicNextPrev(id, data, true, setMusic, setCurrentMusic)
    }

    const playThePrevMusic = (e, id, data, setMusic, setCurrentMusic) => {
        musicNextPrev(id, data, false, setMusic, setCurrentMusic)
    }
    
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
        setLoop(prev => !prev)
        music.loop = music.loop ? false : true
    }

    const checkMusicLoaded = (e) => {
        setMusicDuration(music.duration)
        setMusicCurrentDuration(music.currentTime)
    }

    const checkMusicTime = (e) => {
        setMusicCurrentDuration(music.currentTime)
    }

    const checkMusicEnded = (e) => {
        if(music.loop){
            music.play()
        } else {
            if(playMusic){
                musicNextPrev(currentMusic.id, data, true, setMusic, setCurrentMusic)
            } else {
                music.pause()
            }
        }
    }

    // Music Play
    if(playMusic && currentMusic.title !== ""){
        if(music.ended){
            if(music.loop){
                music.play()
            } 
        } else {
            music.play()
        }
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

    // Music Ended
    useEffect(() => {
        music.removeEventListener("ended", checkMusicEnded)
        music.addEventListener("ended", checkMusicEnded)

        return () => {
            music.removeEventListener("ended", checkMusicEnded)
        }
    }, [data])

    return (
        <>
            <div className="box-margin"></div>
            
            <div className="music-controller">

                <div className="music-controller-wrapper">
                    <div className="text-content">
                        <h3>{currentMusic.title}</h3>
                        <p>{currentMusic.artist}</p>
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

                            <button className="prev" style={{opacity: !currentMusic.title ? 0.3 : 1}} onClick={(e) => playThePrevMusic(e, currentMusic.id, data, setMusic, setCurrentMusic)}><SkipStartFill></SkipStartFill></button>
                            <button className="play-pause" style={{opacity: !currentMusic.title ? 0.3 : 1}} onClick={playTheMusic}>{playMusic ? <PauseFill/> : <PlayFill/>}</button>
                            <button className="next" style={{opacity: !currentMusic.title ? 0.3 : 1}} onClick={(e) => playTheNextMusic(e, currentMusic.id, data, setMusic, setCurrentMusic)}><SkipEndFill></SkipEndFill></button>
                            <button className="loop" onClick={() => setTheLoop(music)} style={{opacity: loop ? 1 : 0.3}}><Repeat></Repeat></button>
                        </div>


                    </div>
                </div>

            </div>
        </>
    )
}

export default MusicController