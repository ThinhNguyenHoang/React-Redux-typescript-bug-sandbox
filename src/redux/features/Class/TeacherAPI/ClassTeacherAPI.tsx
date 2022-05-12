import { apiSlice } from "../../CentralAPI";
import { ID, PaginatedResponse } from "../../../interfaces/types";
import { transformSearchQuery } from "../../APIUtils/TransformParameter";

type TeacherRole = "A" | "B";
const MemberApiWithInvalidateTags = apiSlice.enhanceEndpoints({
	addTagTypes: ["ClassTeacher"],
});

export type Teacher = {
	userId: number;
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	roles: TeacherRole[];
	phone?: string;
	email?: string;
	description: string;
};

const classTeacherApi = MemberApiWithInvalidateTags.injectEndpoints({
	endpoints: (build) => ({
		getTeacherForClass: build.query<
			PaginatedResponse<Teacher>,
			{ classId: number }
		>({
			query: ({ classId }) => `classes/${classId}/teachers`,
			providesTags: (result) => [{ type: "ClassTeacher", id: "LIST" }],
		}),
		getTeacherDetail: build.query<
			Teacher,
			{ classId: number; teacherId: number }
		>({
			query: ({ classId, teacherId }) => {
				return {
					url: `classes/${classId}/members/${teacherId}`,
					method: "GET",
				};
			},
			providesTags: (res, err, args) => [
				{ type: "ClassTeacher", id: args.teacherId },
			],
		}),
		addTeachersToClass: build.mutation<
			Teacher[],
			{ classId: number; teacherIds: ID[] }
		>({
			query: ({ classId, teacherIds }) => {
				return {
					url: `classes/${classId}/teachers`,
					method: "POST",
					body: teacherIds,
				};
			},
			invalidatesTags: (res, err, args) => [
				{ type: "ClassTeacher", id: "LIST" },
			],
		}),
		deleteMember: build.mutation<void, { classId: ID; teacherId: ID }>({
			query: ({ classId, teacherId }) => {
				return {
					url: `classes/${classId}/teachers/${teacherId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: [{ type: "ClassTeacher", id: "LIST" }],
		}),
	}),
	overrideExisting: false,
});

export const { useGetTeacherForClassQuery, useGetTeacherDetailQuery } =
	classTeacherApi;
