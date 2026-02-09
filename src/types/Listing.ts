
export interface Listing{
    id: string;
    title: string;
    description: string;
    location: string;
    price: string;
    agentID: string;
    createdAt: string;
    tags: string[];
    images: string[];
    bedrooms: number;
    type: string;
    availability: string;
    isArchived: boolean;
}

export interface ListingContextType{
    listings: Listing[];
    setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

export interface ListingCardProps{
    id: string;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    type: string;
    availability: string;
    images: string[];
}