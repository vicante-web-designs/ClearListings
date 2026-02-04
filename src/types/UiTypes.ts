export interface ButtonProps{
    label: string;
    variant: Variant;
    type: 'button' | 'submit' | 'reset'
}

export type Variant = 'primary' | 'secondary' | 'danger'

export type ButtonVariant = Record<Variant, string>

export interface NavLinkProps{
    label: string;
    link: string;
}