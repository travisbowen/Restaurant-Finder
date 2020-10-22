import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ dataSearchInput, onSubmit }) {
	const [searchTerm, setSearchTerm] = useState("");

	const onSearchChange = (event) => {
		const searchValue = event.target.value;
		setSearchTerm(searchValue);
	};

	const onSearchSubmit = (event) => {
		event.preventDefault();
		onSubmit(searchTerm);
	};

	return (
		<div className='searchbar'>
			<form onSubmit={onSearchSubmit}>
				<input
					data-search-input={dataSearchInput}
					placeholder='Search by Name, City, or Genre'
					value={searchTerm}
					type='text'
					onChange={onSearchChange}
				/>
			</form>
		</div>
	);
}

export default SearchBar;
