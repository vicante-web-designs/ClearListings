import express from 'express';
import { createListing, getOneListing,getAllListings, updateListing, deleteOneListing } from '../controllers/listing.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import { listingOwnerMiddleware } from '../middleware/listingOwner.middleware.js';



const router = express.Router()



// PUBLIC View

// Get all listings + filtering
router.get('/', getAllListings)

// Get one listing
router.get('/:id', getOneListing)



// ONLY agents or admins

// Create listings
router.post('/', authMiddleware, requireRole('agent', 'admin'), createListing)

// Update listing
router.put('/:id', authMiddleware, listingOwnerMiddleware, requireRole('agent', 'admin'), updateListing)

// Delete one listing
router.delete('/:id', authMiddleware, requireRole('agent', 'admin'), listingOwnerMiddleware, deleteOneListing)

export default router;