import { RootState } from "../../store/store";
import { PayloadAction } from "@reduxjs/toolkit";
import {
	SliceStateWithSearch,
	generateInitialSearchSlice,
	createSliceEnhancedWithSearch,
} from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

const TEXTBOOK_SLICE_KEY = "textbook";

export const TEXT_BOOK_CREATE_ID = -1;

const initialState: SliceStateWithSearch & {
	textBookInEdit: number | undefined | null;
} = {
	...generateInitialSearchSlice(),
	textBookInEdit: undefined,
};

export const textbookSlice = createSliceEnhancedWithSearch({
	name: TEXTBOOK_SLICE_KEY,
	initialState,
	reducers: {
		setTextBookInEdit: (state, action: PayloadAction<number | undefined>) => {
			state.textBookInEdit = action.payload;
		},
		createTextBook: (state) => {
			state.textBookInEdit = TEXT_BOOK_CREATE_ID;
		},
	},
});

export const textbookSelector = {
	// * Select the criteria to pass into the query
	selectSearchCriteria: (state: RootState) => state.textbook.searchCriteria,
	selectTextBookInEdit: (state: RootState) => state.textbook.textBookInEdit,
	selectIsCreatingTextBook: (state: RootState) =>
		state.textbook.textBookInEdit === TEXT_BOOK_CREATE_ID,
};

export const { changeCriteria, createTextBook, setTextBookInEdit } =
	textbookSlice.actions;
