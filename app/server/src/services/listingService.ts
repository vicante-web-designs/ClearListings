import supabase from '../config/supabase.js';
import type { Listing } from '../types/Listing.js';

// Create Listing
export async function createListing(listing: Omit<Listing, 'id' | 'createdAt'>){
    const { data, error } = await supabase.from('listings').insert(listing).select().single();

    if (error) throw error
    return data as Listing
}

// Get one Listing
export async function getOneListing(id: string){
    const { data, error } = await supabase.from('listings').select('*').eq('id', id).single()

    if (error) throw error

    return data as Listing
}