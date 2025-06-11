export interface UserState {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    roles: Roles[];
    managedUsers?: string[];
}

export type Roles = 'admin' | 'viewer' | 'editor';

export type AgentStatus = 'Active' | 'Inactive' | 'Ongoing';

export interface Agent {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    phone: string;
    status?: AgentStatus;
    isEditing?: boolean;
}
