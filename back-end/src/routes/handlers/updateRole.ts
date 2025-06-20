import { log } from 'console';
import { Request, Response } from 'express';
import RoleModel from '../../database/schemas/Role';
import { RoleAssignmentSchema } from '../../utils/validators/zod/createRoleValidator';
import { validateRoleLabels } from '../../utils/validators/labelsValidator';

export default async function updateRole(req: Request, res: Response) {
  log(req.body);
  const body = req.body;
  const label = body.label;
  if (typeof label === 'string' && validateRoleLabels([label]).length > 0) {
    const validateBody = RoleAssignmentSchema.partial().safeParse(body);

    if (validateBody.success) {
      try {
        const { app, role, description, permissions } = validateBody.data;
        const existingRole = await RoleModel.find({ label });
        if (existingRole.length === 1) {
          const newRole = new RoleModel();
          newRole.label = label;
          newRole.isNew = false;
          if (app) newRole.app = app;
          if (role) newRole.role = role;
          if (description) newRole.description = description;
          if (permissions) newRole.permissions = permissions;
          const savedRole = await newRole.save();
          res.status(200).json(savedRole);
        } else {
          res.status(401).json({ error: 'no record found with that label' });
        }
      } catch (error) {
        log(error);
        res.status(501).json(error);
      }
    } else {
      res.status(400).send(validateBody.error.toString());
    }
  } else {
    res.status(405).json({ error: '' });
  }
}
