import { log } from 'console';
import { Request, Response } from 'express';
import RoleModel from '../../database/schemas/Role';
import { RoleAssignmentSchema } from '../../utils/validators/zod/createRoleValidator';

export default async function createRole(req: Request, res: Response) {
  log('creating role');
  log(req.headers['user-agent']);
  const body = req.body;
  const validateBody = RoleAssignmentSchema.safeParse(body);
  if (validateBody.success) {
    try {
      const { app, role, description, permissions } = validateBody.data;
      const checkDuplicate = await RoleModel.find({ label: `${app}:${role}` });
      if (checkDuplicate.length > 0) {
        res.status(406).json({error: 'Role already created'});
      } else {
        const newRole = new RoleModel();
        newRole.isNew = true;
        newRole.app = app;
        newRole.role = role;
        newRole.label = `${app}:${role}`;
        newRole.description = description;
        newRole.permissions = permissions;
        const savedRole = await newRole.save();
        res.status(200).json(savedRole);
      }
    } catch (error) {
      log(error);
      res.status(501).json(error);
    }
  } else {
    res.status(400).send(validateBody.error.toString());
  }
}
