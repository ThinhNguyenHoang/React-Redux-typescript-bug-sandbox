import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../features/CentralAPI";
import { classSlice } from "../features/Class/ClassSlice";
import { classMemberSlice } from "../features/Class/ClassMemberSlice";
import { textbookSlice } from "../features/Textbook/TextbookSlice";
import { notificationSlice } from "../features/Notification/NotificationSlice";
import { studentSlice } from "../features/Student/StudentSlice";
import { gradeFormulaSlice } from "../features/GradeFormula/GradeFormulaSlice";
import {
	classTeacherSlice,
	CLASS_TEACHER_SLICE_KEY,
} from "../features/Class/TeacherAPI/ClassTeacherSlice";
import {
	classDiscussionSlice,
	CLASS_DISCUSSION_SLICE_KEY,
} from "../features/Class/ClassDiscussion/ClassDiscussionSlice";
import {
	classStudentSlice,
	CLASS_STUDENT_SLICE_KEY,
} from "../features/Class/StudentAPI/ClassStudentSlice";

const rootReducer = combineReducers({
	class: classSlice.reducer,
	classMember: classMemberSlice.reducer,
	student: studentSlice.reducer,

	[CLASS_TEACHER_SLICE_KEY]: classTeacherSlice.reducer,
	[CLASS_DISCUSSION_SLICE_KEY]: classDiscussionSlice.reducer,
	[CLASS_STUDENT_SLICE_KEY]: classStudentSlice.reducer,
	textbook: textbookSlice.reducer,

	notification: notificationSlice.reducer,
	gradeFormula: gradeFormulaSlice.reducer,

	[apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
