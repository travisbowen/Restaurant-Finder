import React from "react";
import "./Dropdown.css";

function Dropdown(props) {
	const { buttonTitle, dataSearchInput, onDropDownClick } = props;

	const renderedList = props.list.map((item) => {
		return (
			<a
				className={item}
				data-search-input={dataSearchInput}
				key={item}
				href={item}
				onClick={(event) => onDropDownClick(event)}>
				{item}
			</a>
		);
	});

	return (
		<div className='dropdown'>
			<button className='dropdown__button'>{buttonTitle}</button>
			<div className='dropdown__content'>{renderedList}</div>
		</div>
	);
}

export default Dropdown;
