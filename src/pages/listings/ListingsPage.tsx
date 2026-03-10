import ListingCard from '../../components/features/ListingCard'
import ListingLoadingState from '../../components/ui/LoadingStates/ListingLoadingState'
import SearchPanel from '../../components/features/SearchPanel'
import PageLink from '../../components/ui/links/PageLink'
import { useSelector } from 'react-redux'
import type { RootState } from '../../state/store'
import { useState } from 'react'
import type { Listing } from '../../types/Listing'

const ListingsPage = () => {
    const listings = useSelector((state: RootState) => state.listings.listingValue);

    const [listingDisplay, setListingDisplay] = useState<Listing[]>(listings) // For controlling the display of listings

  return (
    <section className='mt-42 flex flex-col gap-48 items-center'>
        <SearchPanel 
            filterFunction={setListingDisplay}
        />

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
            {
                listingDisplay.length !== 0 ? (
                    listingDisplay.map(listing => (
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
