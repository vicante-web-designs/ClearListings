import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Listing } from '../../types/Listing';
import { mockListings } from '../../data/ListingData';

interface ListingState {
    listingValue: Listing[];
}

const initialState: ListingState = {
    listingValue: mockListings
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
        }
    }
})

export const { createListing, updateListing, deleteListing } = listingSlice.actions;
export default listingSlice.reducer;