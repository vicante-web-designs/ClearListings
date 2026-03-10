import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Listing } from '../../types/Listing';
import { mockListings } from '../../data/ListingData';
import type { PriceFilterKey } from '@/types/filter';

interface ListingState {
    listingValue: Listing[];
    searchTerm: string;
    locationFilter: string;
    priceFilter?: PriceFilterKey;
}

const initialState: ListingState = {
    listingValue: mockListings,
    searchTerm: '',
    locationFilter: ''
}

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        createListing: (state, action: PayloadAction<Listing>) => {
            state.listingValue.push(action.payload)
        },

        updateListing: (state, action: PayloadAction<Listing>) => {
            const matchingListing = state.listingValue.find(listing => listing.id === action.payload.id);

            if (matchingListing){
                Object.assign(matchingListing, action.payload)
            }
        },

        deleteListing: (state, action: PayloadAction<Listing>) => {
            state.listingValue = state.listingValue.filter(listing => listing.id !== action.payload.id)
        },

        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },

        setLocationFilter: (state, action) => {
            state.locationFilter = action.payload
        },

        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload
        }
    }
})

export const { createListing, updateListing, deleteListing, setSearchTerm, setLocationFilter, setPriceFilter } = listingSlice.actions;
export default listingSlice.reducer;