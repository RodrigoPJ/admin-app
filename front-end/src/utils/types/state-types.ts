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
    status: AgentStatus;
    isEditing?: boolean;
}

export interface FormFocus {
    lastName: boolean;
    firstName: boolean;
    email: boolean;
    password: boolean;
    phone: boolean;
    status: boolean;
}

export type KeysFormFocus = 'lastName' | 'firstName' | 'email' | 'password' | 'phone' | 'status';