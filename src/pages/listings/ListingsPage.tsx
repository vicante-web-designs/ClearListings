import ListingCard from '../../components/features/ListingCard'
import ListingLoadingState from '../../components/ui/LoadingStates/ListingLoadingState'
import SearchPanel from '../../components/features/SearchPanel'
import PageLink from '../../components/ui/links/PageLink'
import { useSelector } from 'react-redux'
import type { RootState } from '../../state/store'
import type { Listing } from '../../types/Listing'
import priceMatch from '@/utils/priceMatch'

const ListingsPage = () => {
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

  return (
    <section className='mt-42 flex flex-col gap-48 items-center'>
        <SearchPanel/>

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
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

        <PageLink to='/' children={'Return Home'} />
    </section>
  )
}

export default ListingsPage
