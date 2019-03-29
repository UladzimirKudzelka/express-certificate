import { Request, NextFunction, Response } from 'express';

export type ErrorController = (error: any, req: Request, res: Response, next: NextFunction) => any;
