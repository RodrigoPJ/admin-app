import { Request } from "express";


export type Roles = 'manager' | 'viewer' | 'editor';

export type ExistingApps = 'sms' | 'apptMgmt' | 'admin';

export type SmsAppComponents = 'chats'| 'historical';

export type ApptMgmtCoponents = 'live' | 'historical' | 'dashboard';

export type AdminApp = 'users' | 'roles';

export interface AppComponentMap {
    sms: SmsAppComponents[], 
    apptMgmt: ApptMgmtCoponents[], 
    admin: AdminApp[], 
}

export interface GetRolesRequest{
    labels: string;
}
