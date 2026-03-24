import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filters/filterSlice';
import authReducer from './slices/auth/authSlice'

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        auth: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;