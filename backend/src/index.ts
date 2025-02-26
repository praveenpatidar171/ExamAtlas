import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors'

import userRoutes from './routes/userRoutes'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: 'https://exam-atlas-4drihbvp4-praveens-projects-627d0ef3.vercel.app'   //use your local url of frontend in development
}));
app.use(express.json());

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})