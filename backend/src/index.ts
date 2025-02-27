import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors'
import { VercelRequest, VercelResponse } from "@vercel/node";

import userRoutes from './routes/userRoutes'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: 'https://exam-atlas-psi.vercel.app',  //use your local url of frontend in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());

app.use('/api/v1/user', userRoutes);



export default function handler(req: VercelRequest, res: VercelResponse) {
    return app(req, res);
}


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// })