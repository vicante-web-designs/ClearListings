import { ListingContext } from '../../context/ListingContext/createListingContext'
import { useContext, useState } from 'react'
import type { SearchBarProps } from '../../types/UiTypes'

function SearchBar({ searchFunction }: SearchBarProps){
    const [search, setSearch] = useState<string>('')
    const context = useContext(ListingContext)

    if (!context) return;

    const { listings } = context;

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value;

        setSearch(value)

        const filtered = listings.filter(listing => listing.title.toLowerCase().includes(search.toLowerCase().trim()))

        searchFunction(filtered)

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