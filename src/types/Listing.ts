
export interface Listing{
    id: string;
    title: string;
    price: number;
    location: string;
    city: string;
    state: string;

    propertyType: string;

    bedrooms: number;
    bathrooms: number;
    sizeSqft: number;

    images: string[];

    description: string;
    agentID: string;
    
    features: string[];
    
    
    
    status: "For Sale" | "For Rent";
    
    createdAt: string;
}

export interface ListingContextType{
    listings: Listing[];
    setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

export type ListingCardProps = Partial<Listing>