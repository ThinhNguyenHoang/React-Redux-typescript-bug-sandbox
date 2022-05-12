import { RootState } from "../../store/store";
import {
	SearchCriteriaType,
	generateInitialSearchSlice,
	createSliceEnhancedWithSearch,
} from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

const STUDENT_SLICE_KEY = "student";

const initialState: SearchCriteriaType = {
	...generateInitialSearchSlice(),
};

export const studentSlice = createSliceEnhancedWithSearch({
	name: STUDENT_SLICE_KEY,
	initialState,
	reducers: {},
});

export const studentSelector = {
	selectSearchCriteria: (state: RootState) => state.student.searchCriteria,
};

export const { changeCriteria } = studentSlice.actions;
