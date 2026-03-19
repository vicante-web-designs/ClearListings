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
        const { title, city, state, location, status, minPrice, maxPrice, propertyType } = req.query;

        let query = supabase.from('listings').select('*')

        if (title) query = query.ilike('title', `%${title}%`)
        if (city) query = query.ilike('city', `%${city}%`)
        if (state) query = query.ilike('state', `%${state}%`)
        if (location) query = query.ilike('location', `%${location}%`)
        if (status) query = query.ilike('status', `%${status}%`)
        if (propertyType) query = query.ilike('propertyType', `%${propertyType}%`)
        if (minPrice) query = query.gte('price', Number(minPrice))
        if (maxPrice) query = query.lte('price', Number(maxPrice))

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