import { Request, Response } from "express";
import * as battleService from '../services/battle.js';

export async function battle(req: Request, res: Response) {

    const { firstUser, secondUser }: { firstUser: string, secondUser: string } = req.body;
    if (!firstUser || !secondUser) return res.sendStatus(422);

    const battleResult = await battleService.battle(firstUser, secondUser);
    return res.json({ battleResult });
}

export async function ranking(req: Request, res: Response) {

    return res.sendStatus(200);
}