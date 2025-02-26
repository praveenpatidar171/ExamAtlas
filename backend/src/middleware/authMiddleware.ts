import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            res.status(401).json({
                message: 'token not found , auth failed',
                success: false
            })
            return;
        }
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            res.status(401).json({
                message: 'Wrong token , Autu failed!',
                success: false
            })
            return;
        }
        (req as any).userId = (decoded as JwtPayload).id
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: 'Authentication failed, Invalid token'
        })
    }
}

export default authMiddleware
