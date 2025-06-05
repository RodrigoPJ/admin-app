import { log } from 'console';
import { Request, Response } from 'express';
import Role from '../../database/schemas/Role';

export default async function createRole(req: Request, res: Response) {
  log(req.body);
  const body = req.body;
  try {
    const { name, components } = body;
    if (typeof name === 'string' && components) {
        const newRole = new Role();
        newRole.name = name;
        newRole.components = components;
        const savedRole = await newRole.save();
        res.status(200).json(savedRole);
    } else {
      res.status(400).send('bad request');
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
