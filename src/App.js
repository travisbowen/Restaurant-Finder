import React, { useEffect } from "react";
import "./App.css";

function App() {
	// Runs only once to get data
	useEffect(() => {
		fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
			headers: {
				Authorization: "Api-Key q3MNxtfep8Gt",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	return (
		<div className='app'>
			<h1>App</h1>
		</div>
	);
}

export default App;
