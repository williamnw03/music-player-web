// Import Font Icon
import { useEffect, useState } from "react";
import {
  PlayFill,
  PauseFill,
  VolumeUpFill,
  VolumeMuteFill,
  SkipStartFill,
  SkipEndFill,
  Repeat,
} from "react-bootstrap-icons";

// Import CSS
import "./MusicController.css";

function MusicController({
  playMusic,
  changePlayMusic,
  music,
  currentMusic,
  data,
  musicNextPrev,
  loopInPlaylist,
  playlists,
}) {
  const [musicDuration, setMusicDuration] = useState(0);
  const [musicCurrentDuration, setMusicCurrentDuration] = useState(0);

  const [SoundSlider, setSoundSlider] = useState(false);
  const [voluemOff, setVolumeOff] = useState(false);
  const [volume, setVolume] = useState(100);
  const [loop, setLoop] = useState(false);

  const [currentPlaylist, setCurrentPlaylist] = useState(
    playlists.find((playlist) => playlist.id == loopInPlaylist)
  );

  const minute = parseInt(musicCurrentDuration / 60).toString();
  const second = parseInt(musicCurrentDuration % 60).toString();

  const minuteDuration = parseInt(musicDuration / 60).toString();
  const secondDuration = parseInt(musicDuration % 60).toString();

  const showSoundSlider = () => setSoundSlider((prev) => !prev);

  const playTheMusic = () => {
    if (currentMusic.title !== "") {
      changePlayMusic();
    }
  };

  const playTheNextMusic = (e, id, data) => {
    if (currentMusic.title !== "") {
      musicNextPrev(id, data, true);
      changePlayMusic(true);
    }
  };

  const playThePrevMusic = (e, id, data) => {
    if (currentMusic.title !== "") {
      musicNextPrev(id, data, false);
      changePlayMusic(true);
    }
  };

  const setTheVolume = (e, music) => {
    music.volume = e.target.value / 100;
    setVolume(e.target.value);
    e.target.value === "0" ? setVolumeOff(true) : setVolumeOff(false);

    e.target.style.setProperty(
      "--progress-slider-volume",
      `${(e.target.value / e.target.max) * 100}%`
    );
  };

  const setTheMusicCurrentDuration = (e, music) => {
    setMusicCurrentDuration(e.target.value);
    music.currentTime = parseFloat(e.target.value);

    e.target.style.setProperty(
      "--progress-slider",
      `${Math.ceil(
        (parseFloat(e.target.value) / parseFloat(e.target.max)) * 100
      )}%`
    );
  };

  const durationProgress = () => {
    const slider = document.querySelector("div.timeline-slider input.slider");
    slider.style.setProperty(
      "--progress-slider",
      `${Math.ceil((parseFloat(slider.value) / parseFloat(slider.max)) * 100)}%`
    );
  };

  const setTheLoop = (music) => {
    setLoop((prev) => !prev);
    music.loop = music.loop ? false : true;
  };

  const checkMusicLoaded = (e) => {
    setMusicDuration(music.duration);
    setMusicCurrentDuration(music.currentTime);
  };

  const checkMusicTime = (e) => {
    setMusicCurrentDuration(music.currentTime);
  };

  const checkMusicEnded = (e) => {
    if (music.loop) {
      music.play();
    } else {
      if (playMusic) {
        musicNextPrev(currentMusic.id, data, true);
      } else {
        music.pause();
      }
    }
  };

  // Music Play
  if (playMusic && currentMusic.title) {
    if (music.ended) {
      if (music.loop) {
        music.play();
      }
    } else {
      let playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {})
          .catch((error) => {
            console.log("Play music to fast");
          });
      }
    }
  } else {
    music.pause();
  }

  useEffect(() => {
    music.addEventListener("loadeddata", checkMusicLoaded);
    music.addEventListener("timeupdate", checkMusicTime);

    return () => {
      music.removeEventListener("loadeddata", checkMusicLoaded);
      music.removeEventListener("timeupdate", checkMusicTime);
    };
  }, []);

  // Music Ended
  useEffect(() => {
    music.removeEventListener("ended", checkMusicEnded);
    music.addEventListener("ended", checkMusicEnded);
    music.addEventListener("timeupdate", durationProgress);
    music.addEventListener("loadstart", durationProgress);
    setCurrentPlaylist(
      playlists.find((playlist) => playlist.id == loopInPlaylist)
    );

    return () => {
      music.removeEventListener("ended", checkMusicEnded);
      music.removeEventListener("timeupdate", durationProgress);
      music.removeEventListener("loadstart", durationProgress);
    };
  }, [data, currentMusic, loopInPlaylist, playlists]);

  return (
    <>
      <div className="box-margin"></div>

      <div className="music-controller">
        <div className="music-controller-wrapper">
          <div className="text-content">
            <h3>{currentMusic.title ? currentMusic.title : ""}</h3>
            <p>{currentMusic.artist ? currentMusic.artist : ""}</p>
            <p className="playlist-playing">
              {currentPlaylist
                ? `Playing "${currentPlaylist.name}" Playlist`
                : false}
            </p>
          </div>

          <div className="controller">
            <div className="timeline-slider">
              <p className="duration-start">{`${
                minute.length == 1 ? "0" + minute : minute
              }:${second.length == 1 ? "0" + second : second}`}</p>
              <input
                type="range"
                className="slider"
                max={musicDuration}
                min={0}
                value={musicCurrentDuration}
                onChange={(e) => setTheMusicCurrentDuration(e, music)}
              />
              <p className="duration-end">{`${
                minuteDuration.length == 1
                  ? "0" + minuteDuration
                  : minuteDuration
              }:${
                secondDuration.length == 1
                  ? "0" + secondDuration
                  : secondDuration
              }`}</p>
            </div>

            <div className="controller-button">
              <button className="volume" onClick={showSoundSlider}>
                {voluemOff ? <VolumeMuteFill /> : <VolumeUpFill />}
              </button>

              <div
                className={`controller-sound ${SoundSlider ? "muncul" : ""}`}
              >
                <input
                  type="range"
                  className="slider"
                  max={100}
                  min={0}
                  value={volume}
                  onChange={(e) => setTheVolume(e, music)}
                />
              </div>

              <button
                className="prev"
                style={{ opacity: !currentMusic.title ? 0.3 : 1 }}
                onClick={(e) => playThePrevMusic(e, currentMusic.id, data)}
              >
                <SkipStartFill></SkipStartFill>
              </button>
              <button
                className="play-pause"
                style={{ opacity: !currentMusic.title ? 0.3 : 1 }}
                onClick={playTheMusic}
              >
                {playMusic ? <PauseFill /> : <PlayFill />}
              </button>
              <button
                className="next"
                style={{ opacity: !currentMusic.title ? 0.3 : 1 }}
                onClick={(e) => playTheNextMusic(e, currentMusic.id, data)}
              >
                <SkipEndFill></SkipEndFill>
              </button>
              <button
                className="loop"
                onClick={() => setTheLoop(music)}
                style={{ opacity: loop ? 1 : 0.3 }}
              >
                <Repeat></Repeat>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicController;
