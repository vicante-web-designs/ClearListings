import type { FormFieldProps } from '../../types/UiTypes';

function FormField({ id, type, label, placeholder, value, onChange }: FormFieldProps){
    return(
        <div className='flex flex-col w-full gap-2'>
            <label htmlFor={id} className='font-bold'>
                {label}
            </label>

            <input
                name={id.toLowerCase()}
                type={type}
                id={id}
                title={id}
                placeholder={placeholder}
                className='bg-gray-200 rounded-full py-3 px-6 focus:bg-blue-200 outline-0 caret-blue-800'
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default FormField;