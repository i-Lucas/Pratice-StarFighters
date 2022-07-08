import { Router } from 'express';
import battleRouter from './battle.js';

const router = Router();
router.use(battleRouter);

export default router;