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
        addListing: (state, action: PayloadAction<Listing>) => {
            state.listingValue.push(action.payload)
        }
    }
})

export default listingSlice.reducer;