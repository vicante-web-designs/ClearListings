import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';

function CreateListingPage(){
    return(
        <form className='w-fit mx-auto bg-white rounded-4xl py-8 px-12 flex flex-col items-center gap-12 max-w-[60%]'>

            <article className='*:text-center flex flex-col items-center gap-2'>

                <h2 className='text-2xl font-bold'>
                    List Your Property with Ease
                </h2>

                <p className='max-w-[60%]'>
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

                <article>
                    <label htmlFor="">
                        Tags
                    </label>
                    <input type="text" />
                </article>

                <FormField
                    id='No. of Bedrooms'
                    type='number'
                    label='No. of Bedrooms'
                />

                <article>
                    <label htmlFor="">
                        Type
                    </label>
                    <input type="text" />
                </article>
            </section>

            <Button 
                label='Publish Listing'
                variant='primary'
                type='submit'
            />
        </form>
    )
}

export default CreateListingPage;