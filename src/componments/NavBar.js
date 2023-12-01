import React from "react";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import Stack from "@mui/material/Stack";
import logo from "../assets/images/H.jpg";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  return (
    <nav>
      <h1>High Note </h1>
      <img className="high-note-logo" src={logo} alt="logo" />
      <button
        onClick={() => {
          setLibraryStatus(!libraryStatus);
        }}
      >
        <Stack direction="row" spacing={1}>
          <h4>Songs</h4>
          <LibraryMusicOutlinedIcon sx={{ fontSize: "30", color: "white" }} />
        </Stack>
      </button>
    </nav>
  );
};

export default Nav;
