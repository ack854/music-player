import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  id,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //active
    const newSongs = songs.map((song) => {
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
        <img src={song?.cover} alt={song?.name} />
        <div className="song-description">
          <h3>{song?.name}</h3>
          <h4>{song?.artist}</h4>
        </div>
        {song.isFavourite ? (
          <FavoriteIcon sx={{ fontSize: 20, color: "#2e7d32"}} />
        ) : null}
      </Stack>
    </div>
  );
};

export default LibrarySong;
