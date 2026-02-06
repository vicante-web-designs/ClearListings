import type { FormInputProps } from '../../types/UiTypes';

function FormField({ id, type, label, placeholder }: FormInputProps){
    return(
        <div className='flex flex-col w-full gap-2'>
            <label htmlFor={id} className='font-bold'>
                {label}
            </label>

            <input
                type={type}
                id={id}
                title={id}
                placeholder={placeholder}
                className='bg-gray-200 rounded-full py-3 px-6 focus-visible:border focus-visible:border-blue-600'
            />
        </div>
    )
}

export default FormField;