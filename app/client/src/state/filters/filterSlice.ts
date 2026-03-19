import { createSlice, type PayloadAction}from '@reduxjs/toolkit';
import type { Filters } from '@/types/filter';

interface FilterState {
    filterValues: Filters
}

const initialState: FilterState = {
    filterValues : {
        title: '',
        city: '',
        state: '',
        location: '',
        status: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<{key: keyof Filters, value: string}>) => {
            state.filterValues[action.payload.key] = action.payload.value
        },

        resetFilters: () => initialState
    }

})

export const { setFilter, resetFilters } = filterSlice.actions
export default filterSlice.reducer