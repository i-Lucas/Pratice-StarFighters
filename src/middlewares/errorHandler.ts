import { Request, Response, NextFunction } from 'express';

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {

    if (error.response) {
        return res.sendStatus(error.response.status);
    }

    //if (error.status == 401) return res.status(error.status).send(error.message); // throw errors manually
    res.sendStatus(500); // internal server error
}