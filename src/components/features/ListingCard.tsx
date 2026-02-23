import type { ListingCardProps } from '../../types/Listing'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../ui/Button'

function ListingCard({id, images, title, location, city, state, price, description }: ListingCardProps){
    return(
        <article
            id={id}
            className='bg-neutral-100 w-100 shadow-lg rounded-2xl overflow-hidden flex flex-col h-fit'
        >
            {
                images && (
                    <div className='overflow-hidden'>
                        <img
                            src={images[0]}
                            className='w-full hover:scale-110 transition-all ease-in-out duration-500'
                            alt="" 
                        />
                    </div>
                )
            }

            <article className='px-16 py-24 flex flex-col gap-6'>

                <div>
                    <h3>
                        {title}
                    </h3>
                    
                    { // Listing Price 
                        price && (
                            <p className='text-xl font-bold text-blue-800'>
                                {formatPrice(price)}
                            </p>
                        )
                    }

                    <p>
                        {description}
                    </p>
                </div>

                <p className='font-semibold text-neutral-500'>
                    {`${location}, ${city}, ${state}`}
                </p>

            </article>

            <div className='flex justify-center *:w-full px-16 pb-16'>
                <Button 
                    label='View details'
                    type='button'
                    variant='secondary'
                />
            </div>


        </article>
    )
}

export default ListingCard