import React, { useState, useEffect } from "react";
import "./App.css";
import RestaurantsTable from "./components/RestaurantsTable";

function App() {
	const [restaurants, setRestaurants] = useState([]);

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
					data.sort(sortRestaurants);
					setRestaurants(data);
				});
		};

		getRestaurantsData();
	}, []);

	// Sorts restaurants alphabetically
	function sortRestaurants(a, b) {
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
			<RestaurantsTable restaurants={restaurants} />
		</div>
	);
}

export default App;
