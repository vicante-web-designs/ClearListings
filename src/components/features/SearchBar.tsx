import { ListingContext } from '../../context/ListingContext/createListingContext'
import Button from '../ui/Button'
import { useContext, useState } from 'react'

function SearchBar(){
    const [search, setSearch] = useState<string>('')
    const context = useContext(ListingContext)

    if (!context) return;

    const { listings } = context;

    function handleSearch(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){

        setSearch(e.target.value)

        const newListings = listings.filter(listing => listing.title.toLowerCase().includes(search.toLowerCase()))

        console.log(newListings)

    }

    return (
        <div>
            <h3>
                Search Listing
            </h3>
            <input
                type="text"
                title='search'
                className='rounded-full w-full p-3 bg-white shadow-lg'
                onChange={(e) => {
                    handleSearch(e)
                }}
                value={search}
            />
        </div>
    )
}

export default SearchBar