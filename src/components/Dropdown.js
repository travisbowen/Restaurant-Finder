import React, { useState, useEffect } from "react";
import "./Dropdown.css";
import { useStateValue } from "../utils/stateprovider";

function Dropdown(props) {
	const [listType, setListType] = useState("");
	const [buttonTitle, setButtonTitle] = useState("ALL");
	const [{ state, genre }, dispatch] = useStateValue();

	useEffect(() => {
		if (props.typeList === "state") {
			setListType("state");
		} else if (props.typeList === "genre") {
			setListType("genre");
		}
	}, [props.typeList]);

	const renderedList = props.list.map((item) => {
		return (
			<a key={item} href={item} onClick={(event) => onDropDownClick(event)}>
				{item}
			</a>
		);
	});

	const onDropDownClick = (event) => {
		// Prevent the page from reloading
		event.preventDefault();

		const dropDownItem = event.target.getAttribute("href");
		if (listType === "state") {
			setButtonTitle(dropDownItem);

			// Dispatch the value into the data layer
			dispatch({
				type: "ADD_STATE",
				state: dropDownItem,
			});
		} else if (listType === "genre") {
			setButtonTitle(dropDownItem);

			// Dispatch the value into the data layer
			dispatch({
				type: "ADD_GENRE",
				genre: dropDownItem,
			});
		}
	};

	return (
		<div className='dropdown'>
			<button className='dropdown__button'>{buttonTitle}</button>
			<div className='dropdown__content'>{renderedList}</div>
		</div>
	);
}

export default Dropdown;
