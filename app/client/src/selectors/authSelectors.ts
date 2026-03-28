import type { RootState } from '@/state/store';

export const selectUser = (state: RootState) => state.auth.user; // when you need the user's info — email, id, etc. e.g. displaying their name in the navbar

export const selectRole = (state: RootState) => state.auth.role // when you need the raw role string e.g. redirecting after login based on role

export const selectIsLoading = (state: RootState) => state.auth.isLoading // when the app is still checking if someone is logged in e.g. showing a spinner before deciding what to render

export const selectIsAdmin = (state: RootState) => state.auth.role === 'admin' // when you need to know if they're an admin specifically

export const selectIsAgent = (state: RootState) => state.auth.role === 'agent' // when you need to know if they're an agent specifically

export const selectIsUser = (state: RootState) => state.auth.role === 'user' // when you need to know if they're a regular user
