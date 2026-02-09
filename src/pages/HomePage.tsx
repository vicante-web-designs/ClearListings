import Navbar from '../layout/Navbar'
import HeroSection from '../layout/HeroSection'
import { useContext } from 'react'
import { ListingContext } from '../context/ListingContext/createListingContext'

function HomePage(){
    const context = useContext(ListingContext)

    const { listings } = context;
    return(
        <main className='flex flex-col gap-40'>
            <Navbar />
            <HeroSection />

            <section className='flex w-full justify-between'>
                {
                    listings && listings.map(listing => (
                        <article>
                            <p>{listing.title}</p>
                            <p>{listing.description}</p>
                            <p>{listing.location}</p>
                            <p>{listing.price}</p>
                        </article>
                    ))
                }
            </section>
        </main>
    )
}

export default HomePage