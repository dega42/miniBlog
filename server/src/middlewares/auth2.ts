import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface UserPayLoad {
    user: string;
}
const verifyJWT = function (req: Request & { user?: UserPayLoad }, res: Response, next: NextFunction) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            "secret_this_should_be_longer"
        ); req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId
        }; next();
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
    //     try {
    //         const token = req.header('Authorization')?.replace('Bearer ', '');
    //         if (!token) {
    //             throw new Error();
    //           }

    //           const decoded = jwt.verify(token, process.env.PASSPORT_SECRET || '') as UserPayLoad;
    //           req.user = decoded;

    //           next();
    //     } catch (error) {
    //         res.status(401).send('Please authenticate');
    //     }


    

    // const token = req.headers["x-access-token"]?.split(' ')[1]

    // if (token) {
    //     jwt.verify(token, encodeURIComponent(process.env.PASSPORT_SECRET || ''), (err: any, decoded: { id: any; username: any; }) => {
    //         if (err) return res.send({ isLoggedIn: false, message: 'Failed to Authenticate' })
    //         req.user = {};
    //         req.user.id = decoded.id
    //         req.user.username = decoded.username
    //         next()
    //     })
    // } else {
    //     res.send({ message: 'Incorrect Token Given', isLoggedIn: false })
    // }



}