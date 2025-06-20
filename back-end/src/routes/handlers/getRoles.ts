import { Request, Response } from 'express';
import { GetRolesRequest } from '../../utils/types';
import RoleModel from '../../database/schemas/Role';
import { log } from 'console';
import { validateRoleLabels } from '../../utils/validators/labelsValidator';

export default async function getRole(
  req: Request<{}, {}, {}, GetRolesRequest>,
  res: Response,
) {
  log(req.headers['user-agent']);
  log('getting roles');
  const query = req.query;
  if (query.labels) {
    try {
      const labels = JSON.parse(query.labels);
      if (labels instanceof Array) {
        const validatedLabels = validateRoleLabels(labels);
        const roles = await RoleModel.find({ label: { $in: validatedLabels } });
        res.status(200).json(roles);
        log('roles delivered');
      } else {
        res.status(406).json({ error: 'labels not a valid array' });
      }
    } catch (error) {
      if (error instanceof Error) {
        log(error.message);
        res.status(406).json({ error: error.message });
      } else {
        log(error);
        res.status(503).json({error: 'server error'})
      }
    }
  } else {
    res.status(406).json({ error: 'no labels in query' });
  }
}
