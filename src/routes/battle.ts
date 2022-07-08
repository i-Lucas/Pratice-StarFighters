import { Router } from 'express';
import { battle, ranking } from '../controllers/battle.js';

const battleRouter = Router();

battleRouter.post('/battle', battle);
battleRouter.get('/ranking', ranking);

export default battleRouter;