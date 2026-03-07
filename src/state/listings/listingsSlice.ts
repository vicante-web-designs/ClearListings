import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Listing } from '../../types/Listing';

interface ListingState {
    listingValue: Listing[];
}

const initialState: ListingState = {
    listingValue: []
}

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {

    }
})