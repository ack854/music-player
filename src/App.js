import { useEffect, useRef, useState } from "react";
import Player from "./componments/PlayerSong";
import Song from "./componments/Song";
import "./styles/app.scss";
import axios from "axios";
import Library from "./componments/Library";
import Nav from "./componments/NavBar";
import { useDispatch } from "react-redux";
import { getSongs } from "./redux/actions";
import data from "./componments/data.json";

function App() {
  const [songs, setSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [favouriteChanged, setFavouriteChanged] = useState(0);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favouriteChange = () => {
    setFavouriteChanged(favouriteChanged + 1);
  };
  const handleGetSongs = (songs) => {
    dispatch(getSongs(songs));
  };
  useEffect(() => {
    setSongs(data?.songs);
    handleGetSongs(data?.songs);
    setCurrentSong(data?.songs[0]);
  }, [favouriteChanged]);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (isPlaying) audioRef.current.play();
  };

  return (
    <div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        id={songs.id}
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        favouriteChange={favouriteChange}
      />
      <Library
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        setSongs={setSongs}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong?.audio}
        ref={audioRef}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
