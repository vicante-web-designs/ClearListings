import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@supabase/supabase-js'

interface AuthState {
    user: User | null
    role: 'user' | 'agent' | 'admin' | null
    isLoading: boolean
}

const initialState: AuthState = {
    user: null,
    role: null,
    isLoading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{user: User, role: 'user' | 'agent' | 'admin'}>) => {
            state.user = action.payload.user
            state.role = action.payload.role
            state.isLoading = false
        },
        clearUser: state => {
            state.user = null
            state.role = null
            state.isLoading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const { setUser, clearUser, setLoading } = authSlice.actions
export default authSlice.reducer