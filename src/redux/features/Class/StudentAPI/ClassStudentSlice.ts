import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { EnhancedSliceWithSearch, generateInitialSearchSlice, createSliceEnhancedWithSearch } from "../../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

export interface StudentInnerSlice {}

export const CLASS_STUDENT_SLICE_KEY = "classStudent";

const initialState: EnhancedSliceWithSearch<StudentInnerSlice> = {
	...generateInitialSearchSlice(),
};

export const classStudentSlice = createSliceEnhancedWithSearch({
	name: CLASS_STUDENT_SLICE_KEY,
	initialState,
	reducers: {},
});

export const classStudentSelector = {
	// * Select the criteria to pass into the query
	selectSearchCriteria: (state: RootState) =>
		state[CLASS_STUDENT_SLICE_KEY].searchCriteria,
};

export const { changeCriteria } = classStudentSlice.actions;
