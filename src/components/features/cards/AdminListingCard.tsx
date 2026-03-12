import { Link } from 'react-router-dom'
import type { ListingCardProps } from '../../../types/Listing'
import { formatPrice } from '../../../utils/formatPrice'
import { Button } from '@/components/ui/Buttons/button'
import { Eye, Pencil } from 'lucide-react'
import DeleteListingsModal from '../deleteListingsModal'

function AdminListingCard({id, images, title, location, city, state, price }: ListingCardProps){
    return(
         
        <section>

            {/* Listing Card */}
            <article
                id={id}
                className='w-100 flex flex-col h-130 justify-between'
             >
                <div>
                    { //Card Image
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
                {/* Card Location and button */}
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold text-neutral-700'>
                            {`${location}, ${city}, ${state}`}
                    </p>

                    <div className='flex justify-between w-full'>
                        <Link to={`/listings/${id}`}>
                            <Button variant="secondary">
                                View
                                <Eye color='black' size={18} />
                            </Button>
                        </Link>
                        <Button variant='outline' type='button'
                        >
                            Edit
                            <Pencil color='black' size={18} />
                        </Button>

                        {
                            // Delete modal 
                            id && <DeleteListingsModal listingId={id}/>
                        }
                    </div>
                </div>
            </article>

            {/* Edit modals */}

        </section>
            
    )
}

export default AdminListingCard