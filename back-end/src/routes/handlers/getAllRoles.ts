import { log } from 'console';
import { Request, Response } from 'express';
import RoleModel from '../../database/schemas/Role';

export default async function getAllRoles(req: Request, res: Response) {
  log('getting all roles');
  log(req.headers['user-agent']);
  try {
    const allRoles = await RoleModel.find({});
    res.status(200).json(allRoles);
  } catch (error) {
    res.status(503).json(error);
  }
}
