import HeroSection from '../layouts/HeroSection'
import ListingCard from '@/components/features/cards/ListingCard'
import SearchPanel from '../components/features/SearchPanel'
import ListingLoadingState from '../components/ui/LoadingStates/ListingLoadingState'
import { Analytics } from '@vercel/analytics/react'
import PageLink from '../components/ui/links/PageLink'
import { useSelector } from 'react-redux'
import { selectFilteredListings } from '@/state/listings/listingsSlice';
import { Button } from '@/components/ui/Buttons/button'

const HomePage = () => {
    const filteredListings = useSelector(selectFilteredListings)

    return(
        <main className='flex flex-col gap-40'>
            
            <HeroSection />

            <SearchPanel/>

            <section className='flex flex-col gap-48 items-center'>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
                    {
                        filteredListings.length == 0 ? (
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
                            <div className='flex flex-col'>
                               <div>
                                 <h3>You haven't created any listings yet</h3>

                                 <Button
                                    variant='default'
                                    type='button'
                                 >
                                    Create new listing
                                 </Button>
                               </div>

                                <ListingLoadingState />
                            </div>
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