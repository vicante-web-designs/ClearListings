import supabase from '../config/supabase';
import { Listing } from './../../../client/src/types/Listing';

// Create Listing
export async function createListing(listing: Omit<Listing, 'id' | 'createdAt'>){
    const { data, error } = await supabase.from('listings').insert(listing).select().single();

    if (error) throw error
    return data as Listing
}