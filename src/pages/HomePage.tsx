import HeroSection from '../layouts/HeroSection'
import ListingCard from '../components/features/ListingCard'
import { useContext, useEffect, useState } from 'react'
import { ListingContext } from '../context/ListingContext/createListingContext'
import type { Listing } from '../types/Listing'
import SearchPanel from '../components/features/SearchPanel'
import ListingLoadingState from '../components/ui/LoadingStates/ListingLoadingState'

const HomePage = () => {
    const [listingDisplay, setListingDisplay] = useState<Listing[]>([]);

    const context = useContext(ListingContext)

    if(!context){
        throw new Error('No Context available yet')
    }//To make sure that the context is available before trying to access it

    const { listings } = context; //Destructuring the listings from the context

    useEffect(() => {
        setListingDisplay(listings)
    }, [listings])

    return(
        <main className='flex flex-col gap-40'>
            
            <HeroSection />

            <SearchPanel 
                filterFunction={setListingDisplay}
            />

            <section className='flex w-full flex-wrap px-10 items-center justify-center gap-10'>
                {
                    listingDisplay ? (
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
        </main>
    )
}

export default HomePage