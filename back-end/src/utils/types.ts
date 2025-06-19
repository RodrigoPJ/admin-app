export type Roles = 'admin' | 'viewer' | 'editor';

export interface MasterKeyInterface {
    root: string[],
    viewer: string[],
    editor: string[];
}

export type SmsAppComponents = 'chats'| 'historical';

export type ApptMgmtCoponents = 'live' | 'historical' | 'dashboard';

export type AdminApp = 'users' | 'roles';
