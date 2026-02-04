import type { ButtonProps } from '../../types/UiTypes';
import type { ButtonVariant } from '../../types/UiTypes';

function Button({label, type, variant}: ButtonProps){

    const variants: ButtonVariant = {
        primary: 'bg-blue-600 hover:bg-blue-400 shadow-blue-400',
        secondary: '',
    }

    return(
        <button
            type={type}
            className={`px-6 py-3 text-white rounded-full transition-all ease-in duration-200 shadow-2xl ${variants[variant]}`}
        >
            {label}
        </button>
    )
}

export default Button;