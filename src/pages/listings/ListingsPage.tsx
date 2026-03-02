import ListingCard from '../../components/features/ListingCard'
import ListingLoadingState from '../../components/ui/LoadingStates/ListingLoadingState'
import SearchPanel from '../../components/features/SearchPanel'
import { useContext, useEffect, useState } from 'react'
import { ListingContext } from '../../context/ListingContext/createListingContext'
import type { Listing } from '../../types/Listing'
import PageLink from '../../components/ui/PageLink'

const ListingsPage = () => {
    const [listingDisplay, setListingDisplay] = useState<Listing[]>([]);
    
        const context = useContext(ListingContext)
    
        if(!context){
            throw new Error('No Context available yet')
        }//To make sure that the context is available before trying to access it
    
        const { listings } = context; //Destructuring the listings from the context
    
        useEffect(() => {
            setListingDisplay(listings)
        }, [listings])

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
