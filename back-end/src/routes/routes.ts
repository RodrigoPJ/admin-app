import { Router } from 'express';
import getRoles from './handlers/getRoles';
import getAllUsers from './handlers/getAllUsers';
import getComponents from './handlers/getComponents';
import createRole from './handlers/createRole';
import createUser from './handlers/createUser';
import getUser from './handlers/getUser';

const router = Router();

// return all components in database
router.get('/components', getComponents);
// return all users in database
router.get('/users', getAllUsers);
// create User
router.post('/user', createUser);
// get a specific user
router.get('/user', getUser)
// return all roles in database
router.get('/roles', getRoles);
// create role
router.post('/role', createRole);


export default router;