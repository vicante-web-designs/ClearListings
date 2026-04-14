import { useParams, useNavigate } from 'react-router-dom'
import type { Listing } from '../../types/Listing';
import { formatPrice } from '../../utils/formatPrice';
import { MapPin, Bed, Bath, Maximize, Home, ArrowLeft, Pencil } from 'lucide-react'
import Footer from '../../layouts/Footer';
import IconSet from '../../components/ui/IconSet';
import { Button } from '@/components/ui/Buttons/button';
import DeleteListingsModal from '@/components/features/listingFeatures/DeleteListingsModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectRole } from '@/selectors/authSelectors';

const ListingDetails = () => {
    const role = useSelector(selectRole);
    const navigate = useNavigate();
    const { listingId } = useParams(); //unique Id for listing

    const [listing, setListing] = useState<Listing>()
    const [loading, setLoading] = useState<boolean>(true)    

    // Fetching Listing
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.API_URL}/api/listings/${listingId}`);

                setListing(data)
            
            } catch (error) {
                console.log(error)
                navigate('/listings') // redirect if listing not found
            } finally {
                setLoading(false)
            }
        }

        fetchListing();
    }, [listingId, navigate])

    // Image thumbnails
    const [mainImage, setMainImage] = useState<number>(0)
    const getCurrentImage = () => listing && listing.images[mainImage];

  return (
    <section className='flex flex-col mt-20'>

        {
            !loading ? (
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
                        <div className="overflow-hidden rounded-2xl h-125">
                            {/* Main Listing Image */}
                            <img
                                src={getCurrentImage()}
                                alt={`Image of ${listing.title}`} className='object-cover w-full h-full transition-all duration-500 ease-in-out'
                            />
                        </div>
                        
                        {/* Thumbnail images */}
                        <div className='flex w-full justify-between gap-16'>
                            {
                                listing.images.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setMainImage(index)
                                        }}
                                        className={`object-cover overflow-hidden rounded-xl cursor-pointer flex-1 h-24
                                        transition-all duration-300
                                        ${mainImage === index
                                            ? 'ring-2 ring-primary ring-offset-2 opacity-100'
                                            : 'opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            className='object-cover w-full h-full hover:scale-110 transition-transform duration-500'
                                            alt={`Thumbnail ${index + 1} of ${listing.title}`} 
                                        
                                        />
                                    </div>
                                ))
                            }
                        </div>

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

                    {
                        role === 'admin' || role === 'agent' ? (
                            <div className='flex gap-4'>
                                <Button variant='secondary' type='button' onClick={() => navigate(`/listings/${listingId}/edit`)}
                                >
                                    Edit
                                    <Pencil color='black' size={18} />
                                </Button>

                                {
                                    // Delete modal 
                                    listingId && <DeleteListingsModal listingId={listingId}/>
                                }
                            </div>
                        ) : null
                    }
                </section>
            ) : (
                <p>
                    Listing not found
                </p>
            )
            ) : <h2>Loading ...</h2>
        }

        <Footer />
    </section>
  )
}

export default ListingDetails
