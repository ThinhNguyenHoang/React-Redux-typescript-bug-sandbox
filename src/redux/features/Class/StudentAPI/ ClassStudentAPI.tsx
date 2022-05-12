import { apiSlice } from "../../CentralAPI";
import { PaginatedResponse } from "../../../interfaces/types";
import { transformSearchQuery } from "../../APIUtils/TransformParameter";
import { SearchCriteria } from "../../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

const MemberApiWithInvalidateTags = apiSlice.enhanceEndpoints({
	addTagTypes: ["ClassStudent"],
});

type Student = {
	userId: number;
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	roles?: string[];
	email: string;
	phone: string;
	address: string;
};

const classStudentApi = MemberApiWithInvalidateTags.injectEndpoints({
	endpoints: (build) => ({
		getStudents: build.query<
			PaginatedResponse<Student>,
			{ classId: number; searchCriteria: SearchCriteria }
		>({
			query: ({ classId, searchCriteria }) =>
				`classes/${classId}/students?${transformSearchQuery(searchCriteria)}`,
			providesTags: (result) =>
				result
					? [
							...result.listData.map(
								({ userId }) => ({ type: "ClassStudent", userId } as const)
							),
							{ type: "ClassStudent", id: "LIST" },
					  ]
					: [{ type: "ClassStudent", id: "LIST" }],
		}),
		getStudentDetail: build.query<
			Student,
			{ classId: number; votingId: number }
		>({
			query: ({ classId, votingId }) => {
				return {
					url: `classes/${classId}/members/${votingId}`,
					method: "GET",
				};
			},
			providesTags: (res, err, args) => [
				{ type: "ClassStudent", id: args.votingId },
			],
		}),
	}),
	overrideExisting: false,
});

export const { useGetStudentsQuery, useGetStudentDetailQuery } =
	classStudentApi;
