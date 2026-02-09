import { createContext } from 'react';
import type { ListingContextType } from '../../types/UiTypes';

export const ListingContext = createContext<ListingContextType | undefined>(undefined);