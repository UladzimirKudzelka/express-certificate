import { Request, NextFunction, Response } from 'express';

export type Controller = (req: Request, res: Response, next: NextFunction) => any;
