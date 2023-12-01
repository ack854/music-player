// FileName: Library.js

import React, { useEffect, useState } from "react";
import LibrarySong from "./LibrarySong";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  setLibraryStatus,
  libraryStatus,
}) => {
  const allLibrarySongs = useSelector((state) => state.songs);
  const favSongs = useSelector((state) => state.favourites);
  const showFavourites = () => {
    setSongs(favSongs);
  };
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "two") {
      showFavourites();
    } else if (newValue === "one") {
      setSongs(allLibrarySongs);
    }
  };

  useEffect(() => {
    if (value === "two") {
      showFavourites();
    }
  }, [favSongs]);
  const ChildTabs = styled(Tabs)({
    variant: "fullWidth",
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "white",
    },
  });
  const ChildTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minWidth: 0,
      width: "50%",
      fontWeight: 500,
      color: "gray",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "gray",
        opacity: 1,
      },
      "&.Mui-selected": {
        color: "white",
        fontWeight: 500,
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#d1eaff",
      },
    })
  );

  return (
    <div className={`library ${libraryStatus ? "active" : ""}`}>
      <ChildTabs value={value} onChange={handleChange} aria-label="ant example">
        <ChildTab value="one" label="All Songs" />
        <ChildTab value="two" label="Favourites" />
      </ChildTabs>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            isPlaying={isPlaying}
            audioRef={audioRef}
            songs={allLibrarySongs}
            song={song}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
