import HeroSection from '../layouts/HeroSection'
import ListingCard from '../components/features/ListingCard'
import SearchPanel from '../components/features/SearchPanel'
import ListingLoadingState from '../components/ui/LoadingStates/ListingLoadingState'
import { Analytics } from '@vercel/analytics/react'
import PageLink from '../components/ui/links/PageLink'
import { useSelector } from 'react-redux'
import type { RootState } from '../state/store'
import type { Listing } from '../types/Listing'
import priceMatch from '@/utils/priceMatch';
import type { PriceFilterKey } from '@/types/filter'

const HomePage = () => {
    const listings = useSelector((state: RootState) => state.listings.listingValue);
    const searchTerm = useSelector((state: RootState) => state.listings.searchTerm)
    const priceFilter = useSelector((state: RootState) => state.listings.priceFilter)
    const locationFilter = useSelector((state: RootState) => state.listings.locationFilter)

    const filteredListings: Listing[] = listings.filter(listing => {
            const fullLocation = `${listing.location}${listing.state}${listing.city}`

            const matchesPrice = !priceFilter || priceMatch[priceFilter]?.(listing.price);

            const matchesLocation = !locationFilter || fullLocation.toLowerCase().includes(locationFilter.toLowerCase());

            const matchesSearch = !searchTerm || listing.title.toLowerCase().includes(searchTerm.toLowerCase().trim());

            return matchesPrice && matchesLocation && matchesSearch;
        });

    return(
        <main className='flex flex-col gap-40'>
            
            <HeroSection />

            <SearchPanel/>

            <section className='flex flex-col gap-48 items-center'>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
                    {
                        filteredListings.length !== 0 ? (
                            filteredListings.map(listing => (
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