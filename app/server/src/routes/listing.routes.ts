import express from 'express';
import { createListing, getOneListing,getAllListings, updateListing, deleteOneListing } from '../controllers/listing.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router()

// Get all listings + filtering
router.get('/', getAllListings)

// Get one listing
router.get('/:id', getOneListing)

// Create listings
router.post('/', authMiddleware, createListing)

// Update listing
router.put('/:id', authMiddleware, updateListing)

// Delete one listing
router.delete('/:id', authMiddleware, deleteOneListing)

export default router;