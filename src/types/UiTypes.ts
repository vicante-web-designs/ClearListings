export interface ButtonProps{
    label: string;
    variant: Variant;
    type: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

export type Variant = 'primary' | 'secondary' | 'danger'

export type ButtonVariant = Record<Variant, string>

export interface NavLinkProps{
    label: string;
    link: string;
}

export interface FormInputProps{
    id: string;
    type: string;
    label:string;
    placeholder?: string;
}

export interface Listing{
    title: string;
    description: string;
    location: string;
    price: string
}

export interface ListingContextType{
    listings: Listing[];
    setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}