"use strict";
// import { NextFunction } from "express"
// export default function verifyJwt(
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ): void {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         throw new AppError('JWT token is missing', 401);
//     }
//     const [, token] = authHeader.split(' ');
//     try {
//         const decoded = verify(token, authConfig.jwt.secret);
//         const { sub } = decoded as ITokenPayload;
//         req.user = {
//             id: sub,
//         };
//         return next();
//     } catch {
//         throw new AppError('Invalid JWT token', 401);
//     }
// }
