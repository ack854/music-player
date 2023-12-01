import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import logo from "../assets/images/H.jpg";
const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  id,
  libraryType,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //active
    const filteredSongs =
      libraryType === "favourites"
        ? songs.filter((item) => item.isFavourite)
        : songs;
    const newSongs = filteredSongs.map((song) => {
      if (song.id === id) {
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
    //check if song is playing
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song?.active ? "selected" : ""}`}
    >
      <Stack direction="row" spacing={5}>
        <img
          src={
            song?.sources?.thumbnailUrl !== ""
              ? song?.sources?.thumbnailUrl
              : logo
          }
          alt={song?.name}
        />
        <div className="song-description">
          <h3>{song?.name}</h3>
          <h4>{song?.user?.username}</h4>
        </div>
        {song.isFavourite ? (
          <FavoriteIcon sx={{ fontSize: 20, color: "#2e7d32" }} />
        ) : null}
      </Stack>
    </div>
  );
};

export default LibrarySong;
