import { useContext } from 'react';
import { ListingContext } from './createListingContext';

export const useListings = () => {
    const context = useContext(ListingContext);

    if(!context || context === undefined){
        throw new Error('UseListings must be used within a ListingProvider')
    }

    return context;
}