// Imports
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import listingRouter from './src/routes/listingRouter.js';

const app = express();
const PORT = process.env.PORT || 5000

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

//Routes
app.use('/api/listings', listingRouter)

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})
