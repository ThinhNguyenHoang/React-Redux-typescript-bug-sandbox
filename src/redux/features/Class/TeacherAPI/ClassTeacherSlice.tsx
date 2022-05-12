import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

type ClassTeacherOpeningModal =
	| "ADD_TEACHER_TO_CLASS"
	| "ASSIGN_TEACHER_TO_SESSION"
	| "NONE";

type ClassTeacherSlice = {
	openingModal: ClassTeacherOpeningModal;
};

const initialState: ClassTeacherSlice = {
	openingModal: "NONE",
};


export const CLASS_TEACHER_SLICE_KEY = "classTeacherSlice";
export const classTeacherSlice = createSlice(
    {
        name: CLASS_TEACHER_SLICE_KEY,
        initialState,
        reducers: {
            closeModal: (state) => {
                state.openingModal = "NONE";
            },
            openTeacherAssignmenModal: (state) => {
                state.openingModal = "ADD_TEACHER_TO_CLASS";
            },
            openTeacherSessionAssigmentModal: (state) => {
                state.openingModal = "ASSIGN_TEACHER_TO_SESSION"
            }
        }
    }
)

export const classTeacherSelectors = {
    selectIsAssigningTeacher: (state: RootState) => state[CLASS_TEACHER_SLICE_KEY].openingModal === "ADD_TEACHER_TO_CLASS",
    selectIsAssigningTeacherToSession: (state: RootState) => state[CLASS_TEACHER_SLICE_KEY].openingModal === "ASSIGN_TEACHER_TO_SESSION",
}

export const classTeacherActions = classTeacherSlice.actions;