import { Request, Response } from 'express';
import supabase from '../config/supabase.js';
import type { Listing } from '../types/Listing.js';
import parsePrice from '../utils/parsePriceFilter.js';

// Get all listings
export const getAllListings = async (req: Request, res: Response) => {
  try {
        const { title, city, state, location, status, minPrice, maxPrice, propertyType } = req.query as Record<string, string>;

        let query = supabase.from('listings').select('*')

        if (title) query = query.ilike('title', `%${title}%`)
        if (city) query = query.ilike('city', `%${city}%`)
        if (state) query = query.ilike('state', `%${state}%`)
        if (location) query = query.ilike('location', `%${location}%`)
        if (status) query = query.ilike('status', `%${status}%`)
        if (propertyType) query = query.ilike('propertyType', `%${propertyType}%`)
        if (minPrice) query = query.gte('price', parsePrice(minPrice))
        if (maxPrice) query = query.lte('price', parsePrice(maxPrice))

        const { data, error } = await query

        if (error) throw error
        res.json(data)
  } catch (error) {
    console.error(error)
  }
}

// Get one Listing
export const getOneListing = async (req: Request, res:Response) => {
    const { id } = req.params

    const { data, error } = await supabase.from('listings').select('*').eq('id', id).single()

    if (error || !data){
        return res.status(404).json({ error: 'Listing not found'})
    }

    res.json(data)
}

// Create Listing
export async function createListing(req: Request, res: Response){

    const listingData: Omit<Listing, 'id' | 'createdAt'> = req.body

    const { data, error } = await supabase.from('listings').insert(listingData).select().single();

    if (error) {
        return res.status(500).json({ error: error.message })
    }
    
    res.status(201).json(data)
}

// Update one listing
export const updateListing = async (req: Request, res: Response) => {
    const { id } = req.params
    const updates: Partial<Omit<Listing, 'id' | 'createdAt' >> = req.body

    const { data, error } = await supabase.from('listings').update(updates).eq('id', id).select().single()

    if(error){
        return res.status(500).json({ error: error.message })
    }

    res.json(data)
}

// Delete one listing
export const deleteOneListing = async (req: Request, res: Response) => {
  const { id } = req.params
  
  const { error } = await supabase.from('listings').delete().eq('id', id)

  if(error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({ message: 'Listing deleted successfully'})
}