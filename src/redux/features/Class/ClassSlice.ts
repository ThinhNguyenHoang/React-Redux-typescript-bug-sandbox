// import {
//     createSliceEnhancedWithSearch,
//     generateInitialSearchSlice,
//     SearchCriteriaType
// } from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch.ts";
import {RootState} from "../../store/store";
import { createSliceEnhancedWithSearch, generateInitialSearchSlice, SearchCriteriaType } from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

const CLASS_SLICE_KEY = "class";

const initialState: SearchCriteriaType = {
    ...generateInitialSearchSlice()
}

export const classSlice = createSliceEnhancedWithSearch({
    name: CLASS_SLICE_KEY,
    initialState,
    reducers: {

    },
});

export const classSelector = {
    selectSearchCriteria: (state: RootState) => state.class.searchCriteria
}

export const {changeCriteria} = classSlice.actions;