import { useContext, type FormEvent } from 'react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { ListingContext } from '../context/ListingContext/createListingContext';
import type { Listing } from '../types/UiTypes';
import { useNavigate } from 'react-router-dom';

function CreateListingPage(){
    const navigate = useNavigate();

    const context = useContext(ListingContext)

   const { listings, setListings } = context

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const newListing: Listing = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            location: formData.get('location') as string,
            price: formData.get('price') as string,
        }

        setListings([...listings, newListing])
        
        e.currentTarget.reset();
    }

    return(
        <>
            <form className='w-fit mx-auto bg-white rounded-4xl py-8 px-12 flex flex-col items-center gap-12 max-w-[60%]' onSubmit={handleSubmit}>

                <article className='*:text-center flex flex-col items-center gap-2'>

                    <h2 className='text-2xl font-bold'>
                        List Your Property with Ease
                    </h2>

                    <p className='max-w-[80%]'>
                        Fill out the form below to share your property with thousands of potential clients.
                    </p>

                </article>

                <section className='flex flex-col gap-6 w-full mx-auto'>
                    <FormField
                        id='Title'
                        type='text'
                        label='Title'
                    />

                    <FormField
                        id='Description'
                        type='text'
                        label='Description'
                    />

                    <FormField
                        id='Location'
                        type='text'
                        label='Location'
                    />

                    <FormField
                        id='Price'
                        type='number'
                        label='Price'
                    />
                </section>

                <div className='flex justify-between w-full'>
                                        
                    <Button 
                        label='View Listings'
                        type='submit'
                        variant='secondary'
                        onClick={() => {navigate('/')}}
                    />

                    <Button 
                        label='Publish Listing'
                        variant='primary'
                        type='submit'
                    />
                </div>
            </form>
        </>
    )
}

export default CreateListingPage;