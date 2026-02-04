export interface ButtonProps{
    label: string;
    variant: Variant;
    type: 'button' | 'submit' | 'reset'
}

export type Variant = 'primary' | 'secondary'

export type ButtonVariant = Record<Variant, string>