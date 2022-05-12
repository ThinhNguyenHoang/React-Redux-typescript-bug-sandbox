import { apiSlice } from "../CentralAPI";
import { BaseResponse, PaginatedResponse } from "../../interfaces/types";
import { transformSearchQuery } from "../APIUtils/TransformParameter";
import { type } from "os";
import { SearchCriteria } from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

const studentApiInvalidatesTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Students"],
});

export interface Student {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
}

interface GetStudentsResponse extends BaseResponse {
  data: PaginatedResponse<Omit<Student, "address">>;
}

type UpdateStudentRequest = Pick<
  Student,
  "id" | "firstName" | "lastName" | "email" | "phone" | "address"
>;

type CreateStudentRequest = Omit<UpdateStudentRequest, "id">;

interface CreateStudentResponse extends BaseResponse {
  studentId: number;
}

type UpdateStudentResponse = CreateStudentResponse;

interface GetStudentDetailsResponse extends BaseResponse {
  student: Student;
}

const studentAPI = studentApiInvalidatesTags.injectEndpoints({
  endpoints: (build) => ({
    getStudentListPaginated: build.query<GetStudentsResponse, SearchCriteria>({
      query: (criteria) => `students/?${transformSearchQuery(criteria)}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.data.listData.map(
                ({ id }) => ({ type: "Students", id } as const)
              ),
              { type: "Students", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Students", id: "LIST" }],
    }),
    createStudent: build.mutation<CreateStudentResponse, CreateStudentRequest>({
      query: (body) => ({
        url: "/students",
        method: "post",
        body,
      }),
      invalidatesTags: [{ type: "Students", id: "LIST" }],
    }),
    getStudentDetails: build.query<GetStudentDetailsResponse, number>({
      query: (studentId) => `/students/${studentId}`,
      providesTags: (_, __, studentId) => [{ type: "Students", id: studentId }],
    }),
    updateStudent: build.mutation<UpdateStudentResponse, UpdateStudentRequest>({
      query: (body) => ({
        url: "/students",
        method: "put",
        body,
      }),
      invalidatesTags: (result) =>
        result?.studentId
          ? ["Students", { type: "Students", id: result.studentId }]
          : [],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentListPaginatedQuery,
  useCreateStudentMutation,
  useGetStudentDetailsQuery,
  useUpdateStudentMutation
} = studentAPI;
