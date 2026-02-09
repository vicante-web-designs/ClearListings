import { type ReactNode, useState } from 'react';
import type { Listing } from '../../types/UiTypes';
import { ListingContext } from './createListingContext';

export function ListingProvider({ children }: { children: ReactNode }){
    
    const [listings, setListings] = useState<Listing[]>([]);
    
    const listingValue = {
        listings,
        setListings
    }

    return(
        <ListingContext.Provider value={listingValue}>
            {children}
        </ListingContext.Provider>
    )
};