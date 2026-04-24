import express from 'express';
import cors from 'cors';
import listingRouter from './routes/listing.routes.js'
import { errorHandler } from './middleware/error.middleware.js'

const app = express()

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

app.use(express.json)
app.use('/api/listings', listingRouter)
app.use(errorHandler)

export default app;