import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import supabase from './src/config/supabase.ts';

const app = express();
const PORT = process.env.PORT || 3000

const allowedOrigins = [
    'http://localhost:5173', //development origin
  'https://lasio.vercel.app' //production origin
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/api/test', (req, res) => {
    res.json({message: "It's working, Time to restress"})
})

async function testConnection() {
    const { data, error } = await supabase.rpc('version')
    if (error) {
        console.log('Connection failed:', error.message)
    } else {
        console.log('Supabase connected successfully!')
    }
}

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
    testConnection()
})
