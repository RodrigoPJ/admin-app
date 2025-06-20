import { availableApps, typesOfRoles } from "../../database/initial_values/appsConstants";
import { ExistingApps, Roles } from "../types";
export function validateRoleLabels(labels: string[]): string[] {
  const validLabels: string[] = [];

  for (const label of labels) {
    const [app, role] = label.split(':');

    if (!app || !role) {
      throw new Error(`Invalid format: "${label}". Must be "app:role"`);
    }

    if (!availableApps.includes(app as ExistingApps)) {
      throw new Error(`Invalid app: "${app}" in label "${label}"`);
    }

    if (!typesOfRoles.includes(role as Roles)) {
      throw new Error(`Invalid role: "${role}" in label "${label}"`);
    }

    validLabels.push(label);
  }

  return validLabels;
}