import HeroSection from '../layouts/HeroSection'
import ListingCard from '@/components/features/cards/ListingCard'
import SearchPanel from '../components/features/SearchPanel'
import ListingLoadingState from '../components/ui/LoadingStates/ListingLoadingState'
import PageLink from '../components/ui/links/PageLink'
import { Button } from '@/components/ui/Buttons/button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Listing } from '@/types/Listing'
import { useSelector } from 'react-redux'
import type { RootState } from '@/state/store'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const filters = useSelector((state: RootState) => state.filters.filterValues);
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings ] = useState<Listing[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchListings(){
            setIsLoading(true)

            try {            
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`, {
                    params: filters
                })
                setListings(data)
            } catch (error) {
                console.log(`Error fetching listings: ${error}`)
            } finally {
                setIsLoading(false)
            }
        }
            
        fetchListings()
    }, [filters])

    return(
        <main className='flex flex-col gap-40'>
            
            <HeroSection />

            <SearchPanel/>

            <section className='flex flex-col gap-48 items-center'>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-7xl mx-auto px-6 place-items-center py-16'>
                    {isLoading ? (
                        <ListingLoadingState />
                    ) : listings.length !== 0 ? (
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
                        <div className='col-span-3 flex flex-col items-center gap-4'>
                            <h3>You haven't created any listings yet</h3>
                            <Button variant='default' type='button' onClick={() => navigate('/createListing')}>
                                Create new listing
                            </Button>
                        </div>
                    )}
                </section>

                <PageLink to='/listings' children={'View all Listings'} />
            </section>
        </main>
    )
}

export default HomePage
