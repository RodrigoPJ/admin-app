export const typesOfRoles = ['root', 'manager', 'viewer', 'editor'];

export const availableApps = ['sms', 'apptMgmgt', 'admin'];

export const appComponents = {
  sms: ['chats', 'historical'],
  apptMgmt: ['live', 'historical', 'dashboard'],
  admin: ['users', 'roles'],
};

const example1 = {
  app: 'sms',
  role: 'editor',
  label: 'sms:editor',
  description: 'Agent with read/write access',
  permissions: ['chats', 'historical'],
};

const exampleRole = ['sms:manager', 'apptMgmt:manager', 'admin:manager'];

console.log(JSON.stringify(exampleRole));
