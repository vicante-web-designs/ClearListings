
export interface Listing{
    id?: string;
    title: string;
    description: string;
    location: string;
    state?: string;
    city?: string;
    price: number;
    agentID?: string;
    createdAt?: string;
    features?: string[];
    images?: string[];
    bedrooms?: number;
    bathrooms?: number;
    sizeSqft?: number;
    propertyType?: string;
    status?: string;
}

export interface ListingContextType{
    listings: Listing[];
    setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

export type ListingCardProps = Partial<Listing>