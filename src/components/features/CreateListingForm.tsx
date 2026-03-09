import Button from '../ui/Buttons/Button';
import InputField from '../ui/FormFields/InputField';
import { type FormEvent } from 'react';
// import type { Listing } from '../../types/Listing';

const CreateListingForm = () => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('it is working') 
    }

   
  return (
    <form className='w-fit mx-auto bg-white py-8 px-12 flex flex-col items-center gap-12 max-w-[60%]' onSubmit={(e) => handleSubmit(e)}>

        <article className='*:text-center flex flex-col items-center gap-2'>

            <h2 className='text-2xl font-bold'>
                List Your Property with Ease
            </h2>

            <p className='max-w-[80%]'>
                Fill out the form below to share your property with thousands of potential clients.
            </p>

        </article>

        <section className='flex flex-col gap-6 w-full mx-auto'>
            <InputField
                id='title'
                type='text'
                label='Title'
            />

            <InputField
                id='description'
                type='text'
                label='Description'
            />

            <InputField
                id='loction'
                type='text'
                label='Location'
            />

            <InputField
                id='city'
                type='text'
                label='City'
            />

            <InputField
                id='state'
                type='text'
                label='State'
            />

            <InputField
                id='propertyType'
                type='text'
                label='Property Type'
            />

            <InputField
                id='bedrooms'
                type='number'
                label='Bedrooms'
            />

            <InputField
                id='bathrooms'
                type='number'
                label='Bathrooms'
            />

            <InputField
                id='sizeSqFt'
                type='number'
                label='Square Ft'
            />

            <InputField
                id='Price'
                type='number'
                label='Price'
            />
        </section>

        <Button 
                label='Publish Listing'
                variant='primary'
                type='submit'
            />
    </form>
  )
}

export default CreateListingForm
