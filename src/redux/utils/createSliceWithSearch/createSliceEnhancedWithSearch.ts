import {
	createSlice,
	PayloadAction,
	SliceCaseReducers,
	ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import _ from "lodash";

const DEFAULT_PAGE_SIZE = 5;

export interface Filter {
	field: string;
	values: string[];
}

export interface Sort {
	field: string;
	order: string;
}

export interface Pagination {
	page: number;
	size: number;
}

export interface SearchCriteria {
	keyword: string;
	filter: Filter[];
	sort: Sort[];
	pagination: Pagination;
}

export type SearchCriteriaType = {
	searchCriteria: SearchCriteria;
};

const initialCriteria: SearchCriteria = {
	keyword: "",
	filter: [],
	sort: [],
	pagination: {
		page: 1,
		size: DEFAULT_PAGE_SIZE,
	},
};

export type SliceStateWithSearch = {
	searchCriteria: SearchCriteria;
};

const transformFilter = (filter: any) => {
	return Object.keys(filter)
		.filter((key) => filter[key] != undefined)
		.map((key) => {
			return { field: key, values: filter[key] };
		});
};

export type EnhancedSliceWithSearch<T> = T & SliceStateWithSearch;

// ? WTF is this ????: https://redux-toolkit.js.org/usage/usage-with-typescript#wrapping-createslice
export const createSliceEnhancedWithSearch = <
	SliceState,
	Reducers extends SliceCaseReducers<EnhancedSliceWithSearch<SliceState>>
>({
	name = "",
	initialState,
	reducers,
}: {
	name: string;
	initialState: EnhancedSliceWithSearch<SliceState>;
	reducers: ValidateSliceCaseReducers<
		EnhancedSliceWithSearch<SliceState>,
		Reducers
	>;
}) => {
	return createSlice({
		name,
		initialState,
		reducers: {
			changeCriteria(
				state: EnhancedSliceWithSearch<SliceState>,
				action: PayloadAction<Partial<SearchCriteria>>
			) {
				const { keyword, sort, filter, pagination } = action.payload;
				console.log("state before handled: ", state.searchCriteria.sort);
				console.log("criteria before handled: ", action.payload);
				state.searchCriteria.keyword = keyword || "";
				if (!_.isEmpty(sort) && sort) {
					if (Array.isArray(sort)) {
						state.searchCriteria.sort = sort.map((s) => {
							const { field, order } = s;
							return { field, order };
						});
					} else {
						const { field, order } = sort;
						state.searchCriteria.sort = [{ field, order }];
					}
				} else {
					state.searchCriteria.sort = [];
				}
				if (filter) {
					state.searchCriteria.filter = transformFilter(filter);
				} else {
					state.searchCriteria.filter = [];
				}
				if (pagination) {
					if (pagination.size) {
						state.searchCriteria.pagination.size = pagination.size;
					}
					if (pagination.page) {
						state.searchCriteria.pagination.page = pagination.page;
					}
				}
			},
			...reducers,
		},
	});
};

export const generateInitialSearchSlice = () => {
	return {
		searchCriteria: { ...initialCriteria },
	};
};
