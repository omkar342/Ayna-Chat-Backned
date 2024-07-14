import jwt from 'jsonwebtoken';
require('dotenv').config();
import { Request, Response, NextFunction } from 'express';

import { IncomingHttpHeaders } from 'http';

export interface CustomRequest extends Request {
    userId?: number;
    headers: IncomingHttpHeaders;
}

const JWT_SECRET: string = process.env.JWT_SECRET!;

const generateAccessToken = (userId: number) => {
    const token = jwt.sign({
        userId
    }, JWT_SECRET, {
        expiresIn: '1d'
    });
    return token
}

const verifyAccessToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    let token = req.headers?.['x-access-token'] ?? '';
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    jwt.verify(token.toString(), JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Unauthorized!' });
        }
        req.userId = (decoded as { userId: number }).userId;
        next();
    });
}

export {generateAccessToken, verifyAccessToken};