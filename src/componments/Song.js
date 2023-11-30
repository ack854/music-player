import React from "react"; 

const Song = ({ currentSong }) => { 
	return ( 
		<div className="song-container"> 
			<img src={currentSong?.cover} alt={currentSong?.name}  style={{borderRadius:'50%', animation: `spin ${5}s linear infinite`}}/> 
			<h2>{currentSong?.name}</h2> 
			<h3>{currentSong?.artist}</h3> 
		</div> 
	); 
}; 

export default Song; 
