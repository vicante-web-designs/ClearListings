import express from 'express';
import { createListing, getAllListings, getOneListing } from '../services/listingService.ts';

const router = express.Router()

// Create listings
router.post('/', async (req, res) => {
    const listing = await createListing(req.body);
    res.json(listing)
})

// Get all Listings
router.get('/', async (req, res) => {
    try {
        const listings = await getAllListings();
        res.json(listings)
    } catch(error: any){
        res.status(500).json({error: error.message})
    }
})

// Get one listing
router.get('/:id', async (req, res) => {
    try {
        const listing = await getOneListing(req.params.id)
        res.json(listing)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

export default router;