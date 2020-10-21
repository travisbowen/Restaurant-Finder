import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown({ title, list }) {
	const [stateSelected, setStateSelected] = useState(list[0]);

	const stateList = list.map((state) => {
		return (
			<a key={state} href='#'>
				{state}
			</a>
		);
	});

	return (
    <div className='dropdown'>
      <label>{title}</label>
			<button className='dropdown__button'>{stateSelected}</button>
			<div className='dropdown__content'>{stateList}</div>
		</div>
	);
}

export default Dropdown;
