import React from "react";
import "./RestaurantsTable.css";

function RestaurantsTable({ restaurants }) {
	return (
		<div className='restaurants__tableDiv'>
			<h1>Restaurants Data</h1>
			<table className='restaurants_table'>
				<tbody className='restaurants__tableBody'>
					{restaurants.map(({ name, city, state, telephone, genre }) => (
						<tr key={telephone}>
							<td>{name}</td>
							<td>
								<strong>
									{city}, {state}
								</strong>
							</td>
							<td>{telephone}</td>
							<td>{genre}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default RestaurantsTable;
