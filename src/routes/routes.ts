import { Router } from 'express';
import getComponents from './handlers/getComponents';

const router = Router();

router.get('/components', getComponents);

export default router;