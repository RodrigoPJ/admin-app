import { Router } from 'express';
import getAllRoles from './handlers/getAllRoles';
import createRole from './handlers/createRole';
import getRoles from './handlers/getRoles';

const router = Router();

// return all roles in database
router.get('/all-roles', getAllRoles);
// create role
router.post('/role', createRole);
// return the roles for a s
router.get('/roles', getRoles);
// create role
router.post('/role', createRole);

export default router;