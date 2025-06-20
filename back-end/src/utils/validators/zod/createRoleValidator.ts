import { z } from 'zod';
import { typesOfRoles, availableApps, appComponents } from '../../../database/initial_values/appsConstants'; // adjust the import

const allComponents = [...appComponents.sms, ...appComponents.apptMgmt, ...appComponents.admin]

// Create enums from the arrays
const AppEnum = z.enum(availableApps as [string, ...string[]]);
const RoleEnum = z.enum(typesOfRoles as [string, ...string[]]);
const PermissionsEnum = z.enum(allComponents as [string, ...string[]]);

// Final schema
export const RoleAssignmentSchema = z.object({
  app: AppEnum,
  role: RoleEnum,
  description: z.string().min(1),
  permissions: z.array(PermissionsEnum).nonempty()
});

