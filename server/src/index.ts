import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToDatabase } from './services/database.service';
import routers from './routes';

//import  jwt from 'jsonwebtoken';

//import verifyJwt from './middlewares/auth'

dotenv.config();

const app: Express = express();

const port = process.env.PORT || '6000';

//app.use(verifyJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = ['http://127.0.0.1:5173'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));

app.use('/api/v1', routers);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server for miniBlog');
});

// --- Error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
        statusCode: '404',
        message: 'Page not found'
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error stack: ', err.stack);
    res.status(500).send({
        statusCode: '500',
        message: 'Internal Server Error',
    });
});

app.listen(port, async () => {
    await connectToDatabase();
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});