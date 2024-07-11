import jwt from 'jsonwebtoken';
require('dotenv').config();
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET: string = process.env.JWT_SECRET!;

const accessToken = (userId: number) => {
    const token = jwt.sign({
        userId
    }, JWT_SECRET, {
        expiresIn: '1d'
    });
    return token
}

// const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
//     let token = req.headers['x-access-token'];
//     if (!token) {
//         return res.status(403).send({ message: 'No token provided!' });
//     }
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).send({ message: 'Unauthorized!' });
//         }
//         req.userId = decoded.userId;
//         next();
//     });
// }

export {accessToken};