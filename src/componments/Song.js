import React from "react";
import logo from "../assets/images/H.jpg";
const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        src={
          currentSong?.sources?.thumbnailUrl !== ""
            ? currentSong?.sources?.thumbnailUrl
            : logo
        }
        alt={currentSong?.name}
        style={{
          borderRadius: "50%",
          animation: isPlaying ? `spin ${8}s linear infinite` : "",
        }}
      />
      <h2>{currentSong?.name}</h2>
      <h3>{currentSong?.user?.username}</h3>
    </div>
  );
};

export default Song;
