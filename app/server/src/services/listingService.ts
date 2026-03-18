import supabase from '../config/supabase.ts';
import type { Listing } from './../../../client/src/types/Listing.ts';

// Create Listing
export async function createListing(listing: Omit<Listing, 'id' | 'createdAt'>){
    const { data, error } = await supabase.from('listings').insert(listing).select().single();

    if (error) throw error
    return data as Listing
}

export async function getAllListings(){
    const { data, error } = await supabase.from('listings').select('*');

    if (error) throw error
    return data as Listing[]
}