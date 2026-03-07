import { configureStore } from '@reduxjs/toolkit';
import listingReducer from './listings/listingsSlice';
export const store = configureStore({
    reducer: {
        listings: listingReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;