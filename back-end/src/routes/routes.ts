import { Router } from 'express';
import getAllRoles from './handlers/getAllRoles';
import createRole from './handlers/createRole';
import getRoles from './handlers/getRoles';
import updateRole from './handlers/updateRole'
import deleteRole from './handlers/deleteRole';

const router = Router();

// return all roles in database
router.get('/all-roles', getAllRoles);
// create role
router.post('/role', createRole);
// update role
router.put('/role', updateRole);
// delete role
router.delete('/role', deleteRole)
// return the roles for a user
router.get('/roles', getRoles);

export default router;
