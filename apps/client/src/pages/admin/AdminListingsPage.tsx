import ListingLoadingState from '../../components/ui/LoadingStates/ListingLoadingState'
import SearchPanel from '../../components/features/SearchPanel'
import PageLink from '../../components/ui/links/PageLink'
import { useSelector } from 'react-redux'
import { selectFilteredListings } from '@/state/listings/listingsSlice'
import AdminListingCard from '@/components/features/cards/AdminListingCard'

const AdminListingsPage = () => {
    const filteredListings = useSelector(selectFilteredListings)

  return (
    <section className='mt-42 flex flex-col gap-48 items-center'>
      {/* TODO: Customize this for admins */}
        <SearchPanel/>

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
            {
                filteredListings.length !== 0 ? (
                    filteredListings.map(listing => (
                    <AdminListingCard 
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

export default AdminListingsPage
