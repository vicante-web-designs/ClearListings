import Navbar from '../layout/Navbar'
import HeroSection from '../layout/HeroSection'
import ListingCard from '../components/features/ListingCard'
import { useContext } from 'react'
import { ListingContext } from '../context/ListingContext/createListingContext'

function HomePage(){
    const context = useContext(ListingContext)

    if(!context){
        throw new Error('No Context available yet')
    }

    const { listings } = context;
    return(
        <main className='flex flex-col gap-40'>
            <Navbar />
            <HeroSection />

            <section className='flex w-full flex-wrap px-10 items-center justify-center gap-10'>
                {
                    listings && listings.map(listing => (
                        <ListingCard 
                            key={listing.id}
                            id={listing.id}
                            images={listing.images}
                            title={listing.title}
                            location={listing.location}
                            price={listing.price}  
                            bedrooms={listing.bedrooms}
                            type={listing.type}
                            availability={listing.availability}
                        />
                    ))
                }
            </section>
        </main>
    )
}

export default HomePage