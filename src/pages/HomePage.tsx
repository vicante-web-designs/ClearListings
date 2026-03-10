import HeroSection from '../layouts/HeroSection'
import ListingCard from '../components/features/ListingCard'
import SearchPanel from '../components/features/SearchPanel'
import ListingLoadingState from '../components/ui/LoadingStates/ListingLoadingState'
import { Analytics } from '@vercel/analytics/react'
import PageLink from '../components/ui/links/PageLink'
import { useSelector } from 'react-redux'
import type { RootState } from '../state/store'
import { useEffect, useState } from 'react'
import type { Listing } from '../types/Listing'

const HomePage = () => {
    const listings = useSelector((state: RootState) => state.listings.listingValue)

    const [listingDisplay, setListingDisplay] = useState<Listing[]>(listings) // For controlling the display of listings

    useEffect(() => {
        setListingDisplay(listings)
    }, [listings])

    return(
        <main className='flex flex-col gap-40'>
            
            <HeroSection />

            <SearchPanel 
                filterFunction={setListingDisplay}
            />

            <section className='flex flex-col gap-48 items-center'>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
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

                <PageLink to='/listings' children={'View all Listings'} />
            </section>
            < Analytics />
        </main>
    )
}

export default HomePage