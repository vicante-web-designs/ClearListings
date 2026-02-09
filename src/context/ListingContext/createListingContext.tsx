import { createContext } from 'react';
import type { ListingContextType } from '../../types/Listing';

export const ListingContext = createContext<ListingContextType | undefined>(undefined);