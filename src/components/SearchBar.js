import React from "react";
import "./SearchBar.css";
import { useStateValue } from "../utils/stateprovider";

function SearchBar() {
	const [{ search }, dispatch] = useStateValue();

	const onSearchSubmit = (searchTerm) => {
		// Dispatch the search term into the data layer
		dispatch({
			type: "ADD_SEARCH",
			search: searchTerm,
		});
	};

	return (
		<div className='searchbar'>
			<input
				placeholder='Search by Name, City, or Genre'
				value={search}
				type='text'
				onChange={(event) => onSearchSubmit(event.target.value)}
			/>
		</div>
	);
}

export default SearchBar;
