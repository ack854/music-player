import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FastForwardTwoToneIcon from "@mui/icons-material/FastForwardTwoTone";
import FastRewindTwoToneIcon from "@mui/icons-material/FastRewindTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFav, removeFav } from "../redux/actions";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  id,
  setSongs,
  favouriteChange,
}) => {
  const [isFavourite, setIsFavourite] = useState(currentSong?.isFavourite);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();

  const handleClick = (isFav) => {
    if (isFav) {
      setMessage(
        <div>
          <span style={{ color: "#5c7054" }}>{currentSong.name}</span> Added to
          favourites!
        </div>
      );
    } else {
      setMessage(
        <div>
          <span style={{ color: "#5c7054" }}>{currentSong.name}</span> Removed
          from favourites!
        </div>
      );
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    setIsFavourite(currentSong?.isFavourite);
  }, [currentSong]);
  const handleFavourite = (isFav) => {
    setIsFavourite(isFav);
    const postData = { ...currentSong, isFavourite: isFav };
    axios
      .put(`http://localhost:8082/songs/${currentSong?.id}`, postData)
      .then((data) => {
        if (data?.status === 200) {
          favouriteChange();
          handleClick(isFav);
          if (isFav) {
            dispatch(addFav(postData));
          } else {
            dispatch(removeFav(postData));
          }
        }
      });
  };
  //useEffect
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  //Event Handlers
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        // playAudio(isPlaying, audioRef);
        activeLibraryHandler(songs[songs.length - 1]);

        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const fastForward = () => {
    audioRef.current.currentTime = audioRef.current.currentTime + 10;
    setSongInfo({ ...songInfo, currentTime: songInfo?.currentTime + 10 });
  };

  const fastRewind = () => {
    audioRef.current.currentTime = audioRef.current.currentTime - 10;
    setSongInfo({ ...songInfo, currentTime: songInfo?.currentTime - 10 });
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo?.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong?.color[0]}, ${currentSong?.color[1]} :)`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
      </div>
      <div className="play-control">
        <FastRewindTwoToneIcon sx={{ fontSize: 40 }} onClick={fastRewind} />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          size="2x"
          className="skip-back"
          icon={faAngleLeft}
        />
        {!isPlaying ? (
          <FontAwesomeIcon
            onClick={playSongHandler}
            size="2x"
            className="play"
            icon={faPlay}
          />
        ) : (
          <FontAwesomeIcon
            onClick={playSongHandler}
            size="2x"
            className="pause"
            icon={faPause}
          />
        )}

        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
        />
        <FastForwardTwoToneIcon sx={{ fontSize: 40 }} onClick={fastForward} />
        {!isFavourite ? (
          <FavoriteBorderIcon
            sx={{ fontSize: 30 }}
            onClick={() => {
              handleFavourite(true);
            }}
          />
        ) : (
          <FavoriteIcon
            sx={{ fontSize: 30 }}
            onClick={() => {
              handleFavourite(false);
            }}
          />
        )}
        <ShareIcon sx={{ fontSize: 30 }} />
      </div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default Player;
