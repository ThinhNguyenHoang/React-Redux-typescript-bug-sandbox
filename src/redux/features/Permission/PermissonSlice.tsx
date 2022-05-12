import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PermissionOfUser, RoleOfUser } from "./PermissionAPI";

interface GrantPermissionState {
  isEditing: boolean,
  userId: number,
  roles: RoleOfUser[],
  permissions: PermissionOfUser[],
  viewingRoleId: number,
  viewingPermissionId: number,
  openRoleDetailsModal: boolean,
  openPermissionDetailsModal: boolean,
  backupRoles: RoleOfUser[],
  backupPermissions: PermissionOfUser[],
}

const initialState: GrantPermissionState = {
  isEditing: false,
  userId: 0,
  roles: [],
  permissions: [],
  viewingRoleId: 0,
  viewingPermissionId: 0,
  openRoleDetailsModal: false,
  openPermissionDetailsModal: false,
  backupRoles: [],
  backupPermissions: [],
}

export const grantPermissionSlice = createSlice({
  initialState,
  name: "GrantPermissionSlice",
  reducers: {
    toggleEidtState(state) {
      state.isEditing = !state.isEditing;
    },
    changeUser(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
    setPermissions(state, action: PayloadAction<PermissionOfUser[]>) {
      state.permissions = action.payload;
    },
    addPermission(state, action: PayloadAction<PermissionOfUser>) {
      state.permissions.push(action.payload);
    },
    deletePermisson(state, action: PayloadAction<number>) {
      state.permissions.splice(action.payload, 1);
    },
    editPermissionTime(state, action: PayloadAction<{ index: number, key: String, value: Date }>) {
      const { index, key, value } = action.payload;
      state.permissions[index][key as keyof Pick<PermissionOfUser, "validFrom" | "expiresAt">] = value;
    },
    editPermissionLimit(state, action: PayloadAction<{ index: number, key: string, value: number }>) {
      const { index, key, value } = action.payload;
      state.permissions[index][key as keyof Omit<PermissionOfUser, "id" | "title" | "description" | "validFrom" | "expiresAt">] = value;
    },
    setRoles(state, action: PayloadAction<RoleOfUser[]>) {
      state.roles = action.payload;
    },
    addRole(state, action: PayloadAction<RoleOfUser>) {
      state.roles.push(action.payload);
    },
    editRoleTime(state, action: PayloadAction<{ index: number, key: String, value: Date }>) {
      const { index, key, value } = action.payload;
      state.roles[index][key as keyof Pick<RoleOfUser, "validFrom" | "expiresAt">] = value;
    },
    deleteRole(state, action: PayloadAction<number>) {
      state.roles.splice(action.payload, 1)
    },
    setViewingRoleId(state, action: PayloadAction<number>) {
      state.viewingRoleId = action.payload;
    },
    setViewingPermissionId(state, action: PayloadAction<number>) {
      state.viewingPermissionId = action.payload;
    },
    toggleRoleDetailsModal(state) {
      state.openRoleDetailsModal = !state.openRoleDetailsModal;
    },
    togglePermissionDetailsModal(state) {
      state.openPermissionDetailsModal = !state.openPermissionDetailsModal;
    },
    backupRolesAndPermissions(state) {
      state.backupRoles = state.roles;
      state.backupPermissions = state.permissions;
    },
    cancelEdit(state) {
      state.isEditing = false;
      state.roles = state.backupRoles;
      state.permissions = state.backupPermissions;
    }
  }
})

export const {
  toggleEidtState,
  changeUser,
  setPermissions,
  addPermission,
  deletePermisson,
  editPermissionTime,
  editPermissionLimit,
  setRoles,
  addRole,
  deleteRole,
  editRoleTime,
  setViewingRoleId,
  setViewingPermissionId,
  toggleRoleDetailsModal,
  togglePermissionDetailsModal,
  backupRolesAndPermissions,
  cancelEdit
} = grantPermissionSlice.actions;

