import { BaseResponse } from "../../interfaces/types";
import { apiSlice } from "../CentralAPI";

const permissionApiInvalidatesTags = apiSlice.enhanceEndpoints({ addTagTypes: ['Subordinates', 'Roles', "Permissions", "Authorizations"] });

export interface PermissionOfUser {
  id: number,
  title: String,
  description: String,
  isLimitByBranch: number,
  isLimitByTeaching: number,
  isLimitByDean: number,
  isLimitByManager: number,
  isLimitByLearn: number,
  validFrom: Date,
  expiresAt: Date
}

export interface RoleOfUser {
  id: number,
  title: String,
  validFrom: Date,
  expiresAt: Date
}

export interface GrantPermissionRequest {
  userId: number,
  roles: Omit<RoleOfUser, "title">[],
  permissions: Omit<PermissionOfUser, "title">[]
}

export interface GetRolesOfUserResponse extends BaseResponse {
  userId: number,
  roles: RoleOfUser[]
}

export interface GetPermissionsOfUserResponse extends BaseResponse {
  userId: number,
  permissions: PermissionOfUser[]
}

export interface GetRoleDetailsOfUser extends BaseResponse {

}

export interface OriginalPermission {
  id: number,
  title: string,
  code: string,
  description: string,
  hasLimitByBranch: boolean,
  hasLimitByTeaching: boolean,
  hasLimitByDean: boolean,
  hasLimitByManager: boolean,
  hasLimitByLearn: boolean,
};
export interface GetAllPermissionsResponse extends BaseResponse {
  permissions: OriginalPermission[]
}

export interface LimitPermission {
  limitStart: Date,
  limitEnd: Date,
  unlimitStart: Date,
  unlimitEnd: Date,
}

export interface LimitPermissionOfUser {
  permissionId: number,
  isLimitByBranch: LimitPermission,
  isLimitByTeaching: LimitPermission,
  isLimitByDean: LimitPermission,
  isLimitByManager: LimitPermission,
  isLimitByLearn: LimitPermission,
}

export interface GetLimitPermissionOfUserResponse extends BaseResponse {
  permissions: LimitPermissionOfUser[]
}

interface GrantPermissionResponse extends BaseResponse {
  userId: number
}

const permissionAPI = permissionApiInvalidatesTags.injectEndpoints({
  endpoints: (build) => ({
    grantPermission: build.mutation<GrantPermissionResponse, GrantPermissionRequest>({
      query: (grantPermissionRequest) => ({
        url: 'grantPermissions',
        method: "POST",
        body: grantPermissionRequest
      }),
      invalidatesTags: (result) => result ? [{ type: "Authorizations", id: result.userId }] : []
    }),
    getRolesOfUser: build.query<GetRolesOfUserResponse, number>({
      query: (userId) => `users/${userId}/roles`,
      providesTags: (result, error, userId) => result ? [{ type: "Authorizations", id: userId }] : []
    }),
    getMyRoles: build.query<GetRolesOfUserResponse, void>({
      query: () => `myRoles`,
      providesTags: (result) => result ? [{ type: "Authorizations", id: result.userId }] : ["Roles"]
    }),
    getPermissionsOfUser: build.query<GetPermissionsOfUserResponse, number>({
      query: (userId) => `users/${userId}/permissions`,
      providesTags: (result, error, userId) => result ? [{ type: "Authorizations", id: userId }] : []
    }),
    getLimitPermissions: build.query<GetLimitPermissionOfUserResponse, void>({
      query: () => "users/getLimitPermissions"
    }),
    getAllPermissions: build.query<GetAllPermissionsResponse, void>({
      query: ()=>"/permissions",

    })
  }),
  overrideExisting: false
})


export const {
  useGrantPermissionMutation,
  useGetRolesOfUserQuery,
  useGetMyRolesQuery,
  useGetPermissionsOfUserQuery,
  useGetLimitPermissionsQuery,
  useGetAllPermissionsQuery,
} = permissionAPI;