import express from 'express';
import { createListing, getOneListing,getAllListings, updateListing, deleteOneListing } from '../controllers/listing.controller.js';

const router = express.Router()

// Create listings
router.post('/', createListing)

// Get all listings + filtering
router.get('/', getAllListings)

// Get one listing
router.get('/:id', getOneListing)

// Update listing
router.put('/:id', updateListing)

// Delete one listing
router.delete('/:id', deleteOneListing)

export default router;