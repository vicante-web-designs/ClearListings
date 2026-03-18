import express from 'express';
import { createListing } from '../services/listingService.ts';

const router = express.Router()

router.post('/', async (req, res) => {
    const listing = await createListing(req.body);
    res.json(listing)
})

export default router;