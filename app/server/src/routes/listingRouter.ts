import express from 'express';
import { createListing, getOneListing,getAllListings } from '../controllers/listingControllers.js';

const router = express.Router()

// Create listings
router.post('/', createListing)

// Get all listings + filtering
router.get('/', getAllListings)

// Get one listing
router.get('/:id', getOneListing)

export default router;