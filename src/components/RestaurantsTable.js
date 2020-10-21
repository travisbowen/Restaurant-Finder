import React from "react";
import "./RestaurantsTable.css";

function RestaurantsTable({ restaurants }) {
	return (
		<div className='restaurants__table'>
			<h1>Restaurants Data</h1>
			{restaurants.map(({ name, city, state, telephone, genre }) => (
				<tr>
					<td>{name}</td>
					<td>
						<strong>
							{city},{state}
						</strong>
					</td>
					<td>{telephone}</td>
					<td>{genre}</td>
				</tr>
			))}
		</div>
	);
}

export default RestaurantsTable;
