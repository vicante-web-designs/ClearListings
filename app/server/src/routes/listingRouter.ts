import express from 'express';
import { createListing, getOneListing } from '../services/listingService.ts';
import supabase from '../config/supabase.ts';

const router = express.Router()

// Create listings
router.post('/', async (req, res) => {
    const listing = await createListing(req.body);
    res.json(listing)
})

// Get all listings + filtering
router.get('/', async (req, res) => {
    try {
        const { title, city, state, location, status, minPrice, maxPrice, propertyType } = req.query; // filter parameters

        let query = supabase.from('listings').select('*') // get all listings

        if (title) query = query.eq('title', title)
        if (city) query = query.eq('city', city)
        if (state) query = query.eq('state', state)
        if (location) query = query.eq('location', location)
        if (status) query = query.eq('status', status)
        if (propertyType) query = query.eq('propertyType', propertyType)
        if (minPrice) query = query.gte('price', Number(minPrice))
        if (maxPrice) query = query.lte('price', Number(maxPrice)) //Filter logic

        const { data, error } = await query

        if (error) throw error
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
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