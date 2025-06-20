import { log } from 'console';
import { Request, Response } from 'express';
import RoleModel from '../../database/schemas/Role';

export default async function deleteRole(req: Request, res: Response) {
  log('deleting role');
  log(req.headers['user-agent']);
  const label = req.body['label'];
  if (typeof label === 'string') {
    try {
    const roleToDelete = await RoleModel.find({label});
    if (roleToDelete.length > 0) {
        log(roleToDelete)
        const deletedRole = await RoleModel.deleteMany({label});
        res.status(200).json(deletedRole);
    }else {
        res.status(403).json({error: 'no role found with that label'});
    }
    
  } catch (error) {
    res.status(503).json(error);
  }
  } else {
    res.status(402).json({error: 'no label value in request'});
  }
  
}
