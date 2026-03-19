import { configureStore } from '@reduxjs/toolkit';
import listingReducer from './listings/listingsSlice';
import filterReducer from './filters/filterSlice';
export const store = configureStore({
    reducer: {
        listings: listingReducer,
        filters: filterReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;