import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express'
import cors from 'cors'

import userRoutes from './routes/userRoutes'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: 'https://exam-atlas-psi.vercel.app',  //    //use your local url of frontend in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.use(express.json());

app.options('*', (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "https://exam-atlas-psi.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
    return;
});

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})