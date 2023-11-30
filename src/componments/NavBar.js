import React from "react"; 
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import Stack from '@mui/material/Stack';

const Nav = ({ setLibraryStatus, libraryStatus }) => { 
	return ( 
		<nav> 
			<h1>പാട്ടുപെട്ടി </h1> 
			<button 
				onClick={() => { 
					setLibraryStatus(!libraryStatus); 
				}} 
			>
                <Stack direction="row" spacing={1}>
				<h4>Songs</h4> 
                <LibraryMusicOutlinedIcon sx={{fontSize:'30', color:'white'}}/>
                </Stack>
			</button> 
		</nav> 
	); 
}; 

export default Nav; 
