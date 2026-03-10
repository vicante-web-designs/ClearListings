import { Link } from 'react-router-dom'
import type { ListingCardProps } from '../../types/Listing'
import { formatPrice } from '../../utils/formatPrice'
import { Button } from '@/components/ui/button'

function ListingCard({id, images, title, location, city, state, price }: ListingCardProps){
    return(
        
           <Link to={`/listings/${id}`} className='w-100 h-fit'>

             <article
                id={id}
                className='w-100 flex flex-col h-130 justify-between'
                >
                    <div>
                        {
                            images && (
                                <div className='overflow-hidden'>
                                    <img
                                        src={images[0]}
                                        className='w-full hover:scale-110 transition-all ease-in-out duration-500 h-68'
                                        alt="" 
                                    />
                                </div>
                            )
                        }

                        {/* Title, and price*/}
                        <article className='py-2 flex flex-col gap-6'>

                            <div>
                                <h3>
                                    {title}
                                </h3>
                                
                                { // Listing Price 
                                    price && (
                                        <p className='text-xl font-bold text-primary'>
                                            {formatPrice(price)}
                                        </p>
                                    )
                                }
                            </div>

                        </article>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-neutral-700'>
                                {`${location}, ${city}, ${state}`}
                        </p>
 
                        <div className='flex justify-center *:w-full'>
                            <Button variant='secondary' type='button'
                            >
                                Explore Listings
                            </Button>
                        </div>
                    </div>


                </article>
           </Link>

    )
}

export default ListingCard