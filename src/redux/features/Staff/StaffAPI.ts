import { apiSlice } from "../CentralAPI";
import { BaseResponse } from "../../interfaces/types";

const staffApiInvalidatesTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Staffs"],
});

export interface Staff {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface GetAllStaffsResponse extends BaseResponse {
  staffs: Staff[];
}

export interface GetStaffDetailsResponse extends BaseResponse {
  staff: Staff;
}

export type UpdateStaffRequest = Pick<
  Staff,
  "id" | "firstName" | "lastName" | "email" | "phone"
>;

export interface UpdateStaffResponse extends BaseResponse {
  staffId: number;
}

export type CreateStaffRequest = Omit<UpdateStaffRequest, "id">;

export type CreateStaffResponse = UpdateStaffResponse;

export interface AllocateAccountResquest {
  staffId: number;
  username: string;
  password: string;
}

export interface AllocateAccountResponse {
  staffId: number;
}

export type DeleteAccountResponse = AllocateAccountResponse;

export interface GetStaffsHaveAccountResponse {
  staffs: Pick<Staff, "id" | "firstName" | "lastName">[];
}

const staffAPI = staffApiInvalidatesTags.injectEndpoints({
  endpoints: (build) => ({
    getAllStaffs: build.query<GetAllStaffsResponse, void>({
      query: () => "/staffs",
      providesTags: ["Staffs"],
    }),
    getStaffDetails: build.query<GetStaffDetailsResponse, number>({
      query: (staffId) => `/staffs/${staffId}`,
      providesTags: (_, __, staffId) => [{ type: "Staffs", id: staffId }],
    }),
    updateStaff: build.mutation<UpdateStaffResponse, UpdateStaffRequest>({
      query: (staffInfo) => ({
        url: "/staffs",
        method: "PUT",
        body: staffInfo,
      }),
      invalidatesTags: (result) =>
        result?.staffId
          ? ["Staffs", { type: "Staffs", id: result.staffId }]
          : [],
    }),
    createStaff: build.mutation<CreateStaffResponse, CreateStaffRequest>({
      query: (staffInfo) => ({
        url: "/staffs",
        method: "POST",
        body: staffInfo,
      }),
      invalidatesTags: ["Staffs"],
    }),
    allocateAccount: build.mutation<
      AllocateAccountResponse,
      AllocateAccountResquest
    >({
      query: (body) => ({
        url: "/staffs/allocateAccount",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) =>
        result?.staffId
          ? ["Staffs", { type: "Staffs", id: result.staffId }]
          : [],
    }),
    deleteAccount: build.mutation<DeleteAccountResponse, number>({
      query: (staffId) => ({
        url: `/staffs/${staffId}/deleteAccount`,
        method: "POST",
      }),
      invalidatesTags: (result) =>
        result?.staffId
          ? ["Staffs", { type: "Staffs", id: result.staffId }]
          : [],
    }),
    getStaffsHaveAccount: build.query<GetStaffsHaveAccountResponse, void>({
      query: () => "/staffsHaveAccount",
      providesTags: ["Staffs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllStaffsQuery,
  useGetStaffDetailsQuery,
  useUpdateStaffMutation,
  useCreateStaffMutation,
  useAllocateAccountMutation,
  useDeleteAccountMutation,
  useGetStaffsHaveAccountQuery,
} = staffAPI;
