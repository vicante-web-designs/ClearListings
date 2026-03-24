import type { RootState } from '@/state/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.role
export const selectIsLoading = (state: RootState) => state.auth.isLoading

export const selectIsAdmin = (state: RootState) => state.auth.role === 'admin'
export const selectIsAgent = (state: RootState) => state.auth.role === 'agent'
export const selectIsUser = (state: RootState) => state.auth.role === 'user'