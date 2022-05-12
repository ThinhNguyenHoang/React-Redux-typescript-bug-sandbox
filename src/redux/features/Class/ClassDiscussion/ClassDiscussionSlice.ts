import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ID } from "../../../interfaces/types";
import { RootState } from "../../../store/store";
import {
	createSliceEnhancedWithSearch,
	EnhancedSliceWithSearch,
	generateInitialSearchSlice,
	SearchCriteria,
	SliceStateWithSearch,
} from "../../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";
import { Post, Comment } from "./ClassDiscussionAPI";

type DiscussionSlice = {
	openingThreadModal: "CREAT" | "EDIT" | "NONE";
	threadInEdit: Partial<Post> | undefined;
	commentInEdit: Partial<Comment> | undefined;
	postOfCommentInEdit: ID | undefined;
};

const initialState: EnhancedSliceWithSearch<DiscussionSlice> = {
	...generateInitialSearchSlice(),
	openingThreadModal: "NONE",
	threadInEdit: undefined,
	commentInEdit: undefined,
	postOfCommentInEdit: undefined,
};

export const CLASS_DISCUSSION_SLICE_KEY = "classDicussion";
export const classDiscussionSlice = createSliceEnhancedWithSearch({
	name: CLASS_DISCUSSION_SLICE_KEY,
	initialState,
	reducers: {
		addingNewPost: (state) => {
			state.openingThreadModal = "CREAT";
		},
		editPost: (state, action: PayloadAction<Partial<Post> | undefined>) => {
			state.openingThreadModal = "EDIT";
			state.threadInEdit = action.payload;
		},
		closeModal: (state) => {
			state.openingThreadModal = "NONE";
		},
		editComment: (
			state,
			action: PayloadAction<{
				commentToEdit: Partial<Comment> | undefined;
				postIdOfComment: ID;
			}>
		) => {
			const { commentToEdit, postIdOfComment } = action.payload;
			state.commentInEdit = commentToEdit;
			state.postOfCommentInEdit = postIdOfComment;
		},
		doneEditComment: (state) => {
			state.commentInEdit = undefined;
		},
	},
});

export const classDiscussionSelectors = {
	selectSearchCriteria: (state: RootState) =>
		state[CLASS_DISCUSSION_SLICE_KEY].searchCriteria,
	selectIsAddingNewPost: (state: RootState) =>
		state[CLASS_DISCUSSION_SLICE_KEY].openingThreadModal === "CREAT",
	selectIsEditingPost: (state: RootState) =>
		state[CLASS_DISCUSSION_SLICE_KEY].openingThreadModal === "EDIT",
	selectIsEditingComment: (state: RootState) =>
		state[CLASS_DISCUSSION_SLICE_KEY].commentInEdit !== undefined,
	selectPostInEdit: (state: RootState) =>
		state[CLASS_DISCUSSION_SLICE_KEY].threadInEdit,
	selectCommentInEdit: (state: RootState) =>
		state[CLASS_DISCUSSION_SLICE_KEY].commentInEdit,
	selectPostOFCommentInEdit: (state: RootState) =>
		state[CLASS_DISCUSSION_SLICE_KEY].postOfCommentInEdit,
};

export const classDiscussionActions = classDiscussionSlice.actions;
