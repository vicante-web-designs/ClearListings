import ListingCard from '@/components/features/cards/ListingCard'
import ListingLoadingState from '../../components/ui/LoadingStates/ListingLoadingState'
import SearchPanel from '../../components/features/SearchPanel'
import PageLink from '../../components/ui/links/PageLink'
import { useEffect, useState } from 'react'
import type { Listing } from '@/types/Listing'
import axios from 'axios'

const ListingsPage = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        const fetchListings = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);

            setListings(data)
        }

        fetchListings();
    }, [])

  return (
    <section className='mt-42 flex flex-col gap-48 items-center'>
        <SearchPanel/>

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
            {
                listings && listings.length !== 0 ? (
                    listings.map(listing => (
                    <ListingCard 
                        key={listing.id}
                        id={listing.id}
                        images={listing.images}
                        title={listing.title}
                        location={listing.location}
                        state={listing.state}
                        city={listing.city}
                        price={listing.price}
                        description={listing.description}
                    />
                ))
                ) : (
                    <ListingLoadingState />
                )
            }
        </section>

        <PageLink to='/' children={'Return Home'} />
    </section>
  )
}

export default ListingsPage
