import { Router } from 'express';
const battleRouter = Router();

battleRouter.post('/battle');
battleRouter.get('/ranking');

export default battleRouter;