import type { ButtonProps } from '../../types/UiTypes';
import type { ButtonVariant } from '../../types/UiTypes';

function Button({label, type, variant, onClick}: ButtonProps){

    const variants: ButtonVariant = {
        primary: 'bg-blue-600 hover:bg-blue-400 shadow-blue-400 shadow-2xl text-white',
        secondary: 'bg-blue-50 border-2 hover:bg-blue-200 text-blue-500 font-semibold',
        danger: 'bg-red-600 hover:bg-red-400 shadow-red-400 text-white'
    }

    return(
        <button
            onClick={onClick}
            type={type}
            className={`px-6 py-3 rounded-full transition-all ease-in duration-200 ${variants[variant]}`}
        >
            {label}
        </button>
    )
}

export default Button;