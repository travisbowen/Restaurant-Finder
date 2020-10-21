import React, { useState, useEffect } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import RestaurantsTable from "./components/RestaurantsTable";

function App() {
	const [restaurants, setRestaurants] = useState([]);
	const [genre, setGenre] = useState(["ALL", ""]);
	const [states, setStates] = useState([
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
					setRestaurants(data);
					sortRestaurantGenres(data);
				});
		};

		// Call restaurant data function
		getRestaurantsData();
	}, []);

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
		setGenre(genreArray);
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
				<Dropdown list={states}></Dropdown>
				<Dropdown list={genre}></Dropdown>
			</div>
			<RestaurantsTable restaurants={restaurants} />
		</div>
	);
}

export default App;
