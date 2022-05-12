import {
	createSliceEnhancedWithSearch,
	EnhancedSliceWithSearch,
	generateInitialSearchSlice,
} from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";
import { RootState } from "../../store/store";
import { PayloadAction } from "@reduxjs/toolkit";

const CLASS_SLICE_KEY = "class_member";

type ClassId = {
	classId: number;
};

const initialState: EnhancedSliceWithSearch<ClassId> = {
	classId: -1,
	...generateInitialSearchSlice(),
};

export const classMemberSlice = createSliceEnhancedWithSearch({
	name: CLASS_SLICE_KEY,
	initialState,
	reducers: {
		setClassId: (state, action: PayloadAction<number>) => {
			state.classId = action.payload;
		},
	},
});

export const classMemberSelector = {
	selectSearchCriteria: (state: RootState) => state.classMember.searchCriteria,
	selectClassId: (state: RootState) => state.classMember.classId,
};

export const { setClassId, changeCriteria } = classMemberSlice.actions;
