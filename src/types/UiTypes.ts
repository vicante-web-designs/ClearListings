import type { Listing } from './Listing';
export interface ButtonProps{
    label: string;
    variant: Variant;
    type: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void
}

export type Variant = 'primary' | 'secondary' | 'danger'

export type ButtonVariant = Record<Variant, string>

export interface NavLinkProps{
    label: string;
    link: string;
}

export interface FormFieldProps{
    id: string;
    type: string;
    label:string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SearchBarProps{
    searchFunction: (listings: Listing[]) => void
}
