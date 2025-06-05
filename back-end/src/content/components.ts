import { MasterKeyInterface } from '../utils/types';

export const components: MasterKeyInterface = {
  admin: [
    'read-users-sms-app',
    'write-users-admin-app',
    'read-messages',
    'write-users-analytics-app',
  ],
  viewer: ['read-messages', 'read-users-sms-app'],
  editor: ['read-users-sms-app', 'write-users-admin-app', 'read-messages'],
};
