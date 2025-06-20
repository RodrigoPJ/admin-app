import { AppComponentMap, ExistingApps, Roles } from "../../utils/types";

export const typesOfRoles:Roles[] = ['manager', 'editor', 'viewer'];

export const availableApps:ExistingApps[] = ['sms', 'apptMgmt', 'admin'];

export const appComponents: AppComponentMap = {
  sms: ['chats', 'historical'],
  apptMgmt: ['live', 'historical', 'dashboard'],
  admin: ['users', 'roles'],
};
