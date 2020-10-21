import React from "react";
import "./SearchBar.css";

function SearchBar() {
	return (
		<div className='searchbar'>
			<input placeholder='Search by Name, City, or Genre' type='text' />
		</div>
	);
}

export default SearchBar;
