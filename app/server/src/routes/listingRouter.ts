import express from 'express';
import { createListing, getAllListings } from '../services/listingService.ts';

const router = express.Router()

// Create listings
router.post('/', async (req, res) => {
    const listing = await createListing(req.body);
    res.json(listing)
})

// Get all Listings
router.get('/', async (req, res) => {
    const listings = await getAllListings()
    res.json(listings)
})

export default router;