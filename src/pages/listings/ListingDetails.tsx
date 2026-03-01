import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { ListingContext } from '../../context/ListingContext/createListingContext';
import type { Listing } from '../../types/Listing';
import { formatPrice } from '../../utils/formatPrice';
import { MapPin, Bed, Bath, Maximize, Home, ArrowLeft } from 'lucide-react'
import Footer from '../../layouts/Footer';

const ListingDetails = () => {
    const navigate = useNavigate();
    const { listingId } = useParams();

    const context = useContext(ListingContext)

    if(!context){
        throw new Error('Context not found')
    }

    const { listings } = context;

    const listing = listings.find((listing: Listing) => listing.id.toString() === listingId)

  return (
    <section className='flex flex-col mt-20'>

        {
            listing ? (
                <section className='max-w-3xl mx-auto'>

                    <button
                        type='button'
                        className='w-fit mb-8 text-sm text-blue-800 hover:text-gray-700 transition-colors duration-300 flex items-center gap-2'
                        onClick={() => navigate(-1)}
                    >
            
                        <ArrowLeft size={16}/>
                        
                        <p className='underline underline-offset-2 font-bold decoration-2'>
                            Return
                        </p>
                    </button>

                    {/* Listing Image */}
                    <img src={listing.images[0]} alt={`Image of ${listing.title}`} className='object-cover w-full h-112.5 rounded-2xl'/>

                    {/* Listing content */}
                    <div className='flex flex-col gap-16 my-16'>
                        <div className='flex w-full justify-between items-end'>
                            <h1 className='text-5xl'>
                                {listing.title}
                            </h1>

                            <h3 className='text-green-700 font-bold'>
                                {formatPrice(listing.price)}
                            </h3>
                        </div>

                        <div className='flex justify-between items-center my-16'>
                            {/* Listing description */}
                            <p className='text-xl max-w-[50%]'>
                                {listing.description}
                            </p>

                            <div className={`${listing.status.toLowerCase() === 'for sale' ? 'text-[#FF5733]' : 'text-[#20C997]'} w-fit rounded-lg bg-white shadow-lg font-bold`}>
                                <p className='py-8 px-16'>
                                    {listing.status}
                                </p>
                            </div>
                        </div>

                        {/* Listing location */}
                        <div className='flex gap-4'>
                            <MapPin color='#ff6666' size={24}/>
                            <p>
                                {`${listing.location}, ${listing.city}, ${listing.state}`}
                            </p>
                        </div>

                        <div className='flex justify-between my-32'>
                            <article className='w-fit'>
                                <div className='flex justify-between'>
                                    <Home color='gray' size={24}/>
                                    <p className='font-bold'>
                                        {listing.propertyType}
                                    </p>
                                </div>
                                <p>Property Type</p>
                            </article>

                            <article className='w-fit'>
                                <div className='flex justify-between'>
                                    <Bed color='gray' size={24}/>
                                    <p className='font-bold'>
                                        {listing.bedrooms}
                                    </p>
                                </div>
                                <p>Bedrooms</p>
                            </article>

                            <article className='w-fit'>
                                <div className='flex justify-between'>
                                    <Bath color='gray' size={24}/>
                                    <p className='font-bold'>
                                        {listing.bathrooms}
                                    </p>
                                </div>
                                <p>Bathrooms</p>
                            </article>

                            <article className='w-fit'>
                                <div className='flex justify-between'>
                                    <Maximize color='gray' size={24}/>
                                    <p className='font-bold'>
                                        {`${listing.sizeSqft}`}
                                    </p>
                                </div>
                                <p>Square Feet</p>
                            </article>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <p className='font-bold'>Features:</p>

                            <div className='flex w-fit gap-16'>
                            {
                                listing.features.map((feature, index) => (
                                    <p 
                                    key={index}
                                    className='border px-16 py-8 rounded-lg border-secondary bg-neutral-200'>
                                        {feature}
                                    </p>
                                ))
                            }
                        </div>
                        </div>
                    </div>

                    
                </section>
            ) : (
                <p>
                    Listing does not exist
                </p>
            )
        }

        <Footer />
    </section>
  )
}

export default ListingDetails
