"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const verifyJwt = <T>(token: string): T | null => {
//     try {
//         const publicKey = Buffer.from(
//             config.get<string>('accessTokenPublicKey'),
//             'base64'
//         ).toString('ascii');
//         return jwt.verify(token, publicKey) as T;
//     } catch (error) {
//         return null;
//     }
// };
// export const verifyJwt = function (req: Request, res: Response, next: NextFunction) {
//     // Get token from header
//     const token = req.header('x-auth-token');
//     // Check if no token
//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }
//     // Verify token
//     try {
//         jwt.verify(token, encodeURIComponent(process.env.JWT_SECRET || ''), (error, decoded) => {
//             if (error) {
//                 return res.status(401).json({ msg: 'Token is not valid' });
//             } else {
//                 req.user = decoded.user;
//                 next();
//             }
//         });
//     } catch (err) {
//         console.error('something wrong with auth middleware');
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };
