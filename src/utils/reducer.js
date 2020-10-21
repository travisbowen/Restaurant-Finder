export const initialState = {
	search: "",
	state: "ALL",
	genre: "ALL",
};

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case "ADD_SEARCH":
			return {
				...state,
				search: action.search,
			};

		case "ADD_STATE":
			return {
				...state,
				state: action.state,
			};

		case "ADD_GENRE":
			return {
				...state,
				genre: action.genre,
			};

		default:
			return state;
	}
};

export default reducer;
