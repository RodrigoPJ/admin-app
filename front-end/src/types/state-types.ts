export interface UserState {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    roles: Roles[];
    managedUsers?: string[];
}

export type Roles = 'admin' | 'viewer' | 'editor';