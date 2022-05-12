import { BaseResponse } from "../../interfaces/types";
import { apiSlice } from "../CentralAPI";

const roleApiInvalidatesTags = apiSlice.enhanceEndpoints({ addTagTypes: ['RoleDetails', 'roles'] });

export interface PermissionOfRole {
    id: number,
    code: String,
    title: String,
    description: String,
    isLimitByBranch: number,
    isLimitByTeaching: number,
    isLimitByDean: number,
    isLimitByManager: number,
    isLimitByLearn: number,
}

export interface RoleResponse {
    id: number,
    title: string,
    description: string
    permissions: PermissionOfRole[]
}

export interface GetRoleResponse extends BaseResponse {
    role: RoleResponse,
}

export interface Role {
    id: number,
    title: string,
    description: string
}

export interface GetAllRolesResponse extends BaseResponse {
    roles: Role[]
}

export interface CreateRoleRequest {
    title: string,
    description: string,
    permissions: Omit<PermissionOfRole, "title" | "code" | "description">[]
}

export interface CreateRoleResponse extends BaseResponse {
    roleId: number
}

export interface UpdateRoleRequest {
    roleId: number,
    title: string,
    description: string,
    permissions: Omit<PermissionOfRole, "title" | "code" | "description">[]
}

export interface UpdateRoleResponse extends BaseResponse {
    roleId: number
}


export const roleAPI = roleApiInvalidatesTags.injectEndpoints({
    endpoints: (build) => ({
        getRole: build.query<GetRoleResponse, { roleId: number }>({
            query: ({ roleId }) => `roles/${roleId}`,
            providesTags: (result, error, { roleId }) => ([{ type: "RoleDetails", id: roleId }])
        }),
        getAllRoles: build.query<GetAllRolesResponse, void>({
            query: () => "roles",
            providesTags: ['roles']
        }),
        createRole: build.mutation<CreateRoleResponse, CreateRoleRequest>({
            query: (body) => ({
                url: "roles",
                method: "POST",
                body
            }),
            invalidatesTags: result => result && result.roleId ? ["roles", {
                type: "RoleDetails",
                id: result.roleId
            }] : ["roles"]
        }),
        updateRole: build.mutation<UpdateRoleResponse, UpdateRoleRequest>({
            query: (body) => ({
                url: "roles",
                method: "PUT",
                body
            }),
            invalidatesTags: result => result && result.roleId ? ["roles", {
                type: "RoleDetails",
                id: result.roleId
            }] : ["roles"]
        }),
        deleteRole: build.mutation<UpdateRoleResponse, number>({
            query: (roleId) => ({
                url: `roles/${roleId}`,
                method: "DELETE"
            }),
            invalidatesTags: result => result && result.roleId ? ["roles", {
                type: "RoleDetails",
                id: result.roleId
            }] : ["roles"]
        })
    }),
    overrideExisting: false
})

export const {
    useGetRoleQuery,
    useGetAllRolesQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation
} = roleAPI;