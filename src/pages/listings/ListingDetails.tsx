import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { ListingContext } from '../../context/ListingContext/createListingContext';
import type { Listing } from '../../types/Listing';
import { formatPrice } from '../../utils/formatPrice';
import { MapPin, Bed, Bath, Maximize, Home, ArrowLeft } from 'lucide-react'
import Footer from '../../layouts/Footer';
import IconSet from '../../components/ui/IconSet';

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
                <section className='max-w-[90%] mx-auto flex flex-col gap-8'>

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

                    {/* listing image, title and price */}
                    <div className='flex flex-col gap-4'>
                        {/* Listing Image */}
                        <img src={listing.images[0]} alt={`Image of ${listing.title}`} className='object-cover w-full h-full rounded-2xl'/>

                        <div className='flex w-full justify-between items-start'>
                            <h1 className='text-5xl text-black'>
                                {listing.title}
                            </h1>

                            <h3 className='text-primary font-bold'>
                                {formatPrice(listing.price)}
                            </h3>
                        </div>
                    </div>

                    {/* Listing content */}
                    <div className='flex flex-col gap-8'>
                        <div className='flex justify-between items-start'>
                            {/* Listing description */}
                            <p className='text-xl max-w-[60%]'>
                                {listing.description}
                            </p>

                            {/* Listing location */}
                            <div className='flex gap-4'>
                                <MapPin color='#ff6666' size={24}/>
                                <p>
                                    {`${listing.location}, ${listing.city}, ${listing.state}`}
                                </p>
                            </div>
                        </div>

                        
                        {/* Listing Icons */}
                        <div className='flex justify-between'>

                            <IconSet 
                                title={'Property Type'}
                                icon={<Home color='gray' size={24}/>}
                                value={listing.propertyType}
                            />

                            <IconSet 
                                title={'Bedrooms'}
                                icon={<Bed color='gray' size={24}/>}
                                value={listing.bedrooms}
                            />

                            <IconSet 
                                title={'Bathrooms'}
                                icon={<Bath color='gray' size={24}/>}
                                value={listing.bathrooms}
                            />

                            <IconSet 
                                title={'Square Feet'}
                                icon={<Maximize color='gray' size={24}/>}
                                value={`${listing.sizeSqft}`}
                            />
                        </div>

                        {/* Listing features */}
                        <div className='flex w-fit gap-2 flex-wrap'>
                            {listing.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className='
                                        inline-flex items-center
                                        px-4 py-1.5
                                        border border-secondary/40
                                        text-2xs uppercase tracking-wide-2 font-regular text-text-secondary
                                        rounded-none
                                        bg-secondary/5
                                        hover:bg-secondary/10 hover:border-secondary
                                        transition-all duration-300
                                        cursor-default
                                    '
                                >
                                    {feature}
                                </span>
                            ))}
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
