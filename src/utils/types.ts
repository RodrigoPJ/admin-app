export type Roles = 'admin' | 'viewer' | 'editor';

export interface MasterKeyInterface {
    admin: string[],
    viewer: string[],
    editor: string[];
}
