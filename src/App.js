import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import RestaurantsTable from "./components/RestaurantsTable";
import SearchBar from "./components/SearchBar";

function App() {
	const [restaurants, setRestaurants] = useState([]);
	const [filteredRestaurants, setFilteredRestaurants] = useState([]);
	const [genreList, setGenreList] = useState(["ALL", ""]);
	const [genre, setGenre] = useState("");
	const [state, setState] = useState("");
	const [search, setSearch] = useState("");
	const [buttonStateTitle, setButtonStateTitle] = useState("ALL");
	const [buttonGenreTitle, setButtonGenreTitle] = useState("ALL");
	const [statesList, setStates] = useState([
		"ALL",
		"AZ",
		"AL",
		"AK",
		"AR",
		"CA",
		"CO",
		"CT",
		"DE",
		"FL",
		"GA",
		"HI",
		"ID",
		"IL",
		"IN",
		"IA",
		"KS",
		"KY",
		"LA",
		"ME",
		"MD",
		"MA",
		"MI",
		"MN",
		"MS",
		"MO",
		"MT",
		"NE",
		"NV",
		"NH",
		"NJ",
		"NM",
		"NY",
		"NC",
		"ND",
		"OH",
		"OK",
		"OR",
		"PA",
		"RI",
		"SC",
		"SD",
		"TN",
		"TX",
		"UT",
		"VT",
		"VA",
		"WA",
		"WV",
		"WI",
		"WY",
	]);
	const isFiltered = useRef(false);

	// Runs only once to get data
	useEffect(() => {
		const getRestaurantsData = async () => {
			await fetch(
				"https://code-challenge.spectrumtoolbox.com/api/restaurants",
				{
					headers: {
						Authorization: "Api-Key q3MNxtfep8Gt",
					},
				},
			)
				.then((response) => response.json())
				.then((data) => {
					data.sort(sortRestaurantsAlphabetically);
					sortRestaurantGenres(data);
					setRestaurants(data);
					setFilteredRestaurants(data);
				});
		};
		// Call restaurant data function
		getRestaurantsData();
	}, []);

	const filterRestaurants = useCallback(() => {
		if (genre === "ALL" || state === "ALL") {
			setFilteredRestaurants(restaurants);
		} else {
			let filteredRestaurantsTemp = [];

			if (search !== "") {
				filteredRestaurantsTemp = restaurants.filter((restaurant) => {
					if (
						restaurant.city === search ||
						restaurant.genre === search ||
						restaurant.name === search ||
						restaurant.state === search
					) {
						return restaurant;
					}
				});
				isFiltered.current = true;
			}

			if (state !== "") {
				const r = isFiltered.current ? filteredRestaurantsTemp : restaurants;
				filteredRestaurantsTemp = r.filter((restaurant) => {
					if (restaurant.state === state) {
						return restaurant;
					}
				});
				isFiltered.current = true;
			}

			if (genre !== "") {
				const r = isFiltered.current ? filteredRestaurantsTemp : restaurants;
				filteredRestaurantsTemp = r.filter((g) =>
					g.genre.split(",").includes(genre),
				);
			}

			setFilteredRestaurants(filteredRestaurantsTemp);
			isFiltered.current = false;
		}
	}, [genre, search, state]);

	useEffect(() => {
		filterRestaurants();
	}, [filterRestaurants]);

	const handleSearchDropdownChange = (event) => {
		// Prevent the page from reloading
		event.preventDefault();
		const searchInput = event.target.dataset.searchInput;
		const searchValue = event.target.getAttribute("href");

		if (searchInput === "state") {
			setButtonStateTitle(searchValue);
			setState(searchValue);
		} else if (searchInput === "genre") {
			setButtonGenreTitle(searchValue);
			setGenre(searchValue);
		}
	};

	// Sorts restaurant genres and adds to state
	function sortRestaurantGenres(data) {
		let genreArray = ["ALL"];
		for (const restaurant of data) {
			const restaurantGenreArray = restaurant.genre.split(",");
			for (const genre of restaurantGenreArray) {
				const verdict = genreArray.includes(genre);
				if (!verdict) {
					genreArray.push(genre);
				}
			}
		}
		setGenreList(genreArray);
	}

	// Sorts restaurant names
	function sortRestaurantsAlphabetically(a, b) {
		// Use toUpperCase() to ignore character casing
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();

		let comparison = 0;
		if (nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}
		return comparison;
	}

	return (
		<div className='app'>
			<h1>Restaurant Finder</h1>
			<div className='app__header'>
				<SearchBar dataSearchInput='search' onSubmit={setSearch} />
				<Dropdown
					buttonTitle={buttonStateTitle}
					dataSearchInput='state'
					onDropDownClick={handleSearchDropdownChange}
					list={statesList}
				/>
				<Dropdown
					buttonTitle={buttonGenreTitle}
					dataSearchInput='genre'
					onDropDownClick={handleSearchDropdownChange}
					list={genreList}
				/>
			</div>
			<RestaurantsTable restaurants={filteredRestaurants} />
		</div>
	);
}

export default App;
