import { createContext } from 'react';
import type { Listing } from '../types/UiTypes';

export const ListingContext = createContext<Listing | undefined>(undefined);