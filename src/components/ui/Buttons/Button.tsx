import type { ButtonProps } from '../../../types/UiTypes';
import type { ButtonVariant } from '../../../types/UiTypes';

function Button({label, type, variant, onClick}: ButtonProps){

    const variants: ButtonVariant = {
        primary: 'bg-primary text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-primary shadow-2xl text-white',
        secondary: 'bg-secondary text-text-primary hover:bg-bg-main',
        outline:'border-secondary border text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-[rgba(197,164,109,0.2)]',
        danger: 'bg-error hover:bg-red-400 shadow-red-400 text-white'
    }

    return(
        <button
            onClick={onClick}
            type={type}
            className={`px-6 py-3 transition-all ease-in duration-200 ${variants[variant]}`}
        >
            {label}
        </button>
    )
}

export default Button;