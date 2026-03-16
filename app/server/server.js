import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/api/test', (req, res) => {
    res.json({message: "It's working, Time to restress"})
})

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})