import type { FilterProp } from '../../types/UiTypes';
import { useState, useEffect } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react'
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';


// Type of price filter options, ensuring type safety when setting the price filter state
type PriceFilterKey = 'under-10m' | '10m-20m' | '20m-30m' | 'above-30m';

const SearchPanel = ({ filterFunction }: FilterProp) => {
    const listings = useSelector((state: RootState) => state.listings.listingValue)

    const [priceFilter, setPriceFilter] = useState<PriceFilterKey>(); // State for the selected price filter option
    const [locationFilter, setLocationFilter] = useState<string>('');  // State for the location filter input
    const [searchValue, setSearchValue] = useState<string>(''); // State for the search input value

    useEffect(() => {
        const priceMatch: Record<PriceFilterKey, (price: number) => boolean> = {
            'under-10m': (price: number) => price < 10000000,
            '10m-20m': (price: number) => 10000000 <= price && price <= 20000000,
            '20m-30m': (price: number) => 20000000 <= price && price <= 30000000,
            'above-30m': (price: number) => price > 30000000
        } // Object mapping price filter keys to their corresponding filtering functions

        // Filtering the listings based on the selected price filter, location filter, and search value
        const handleFilter = () => {
        const filtered = listings.filter(listing => {
            const fullLocation = `${listing.location}${listing.state}${listing.city}`

            const matchesPrice = !priceFilter || priceMatch[priceFilter]?.(listing.price);

            const matchesLocation = !locationFilter || fullLocation.toLowerCase().includes(locationFilter.toLowerCase());

            const matchesSearch = !searchValue || listing.title.toLowerCase().includes(searchValue.toLowerCase().trim());

            return matchesPrice && matchesLocation && matchesSearch;
        });

        filterFunction(filtered)
    }

        handleFilter();
    }, [priceFilter, locationFilter, listings, filterFunction, searchValue])

    return (
        <section className='flex justify-center'>
            <div className='flex flex-col gap-4 w-[80%] max-w-7xl items-center'>

                {/* Search Bar */}
                <div className='flex items-center gap-16 rounded-md w-full bg-white shadow-lg py-4 px-6 hover:outline'>
                    <Search color='gray' size={32} />
                    <input
                        type="text"
                        title='search'
                        className='w-full outline-0'
                        placeholder='Search by name'
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                        value={searchValue}
                    />
                </div>

                {/* Filter Panel */}
                <section className='flex items-start gap-16 w-full'>
                    
                    {/* Price Filter */}
                    <div className='relative'>
            
                        <select
                            name="price" id="price" title='price' className='bg-white shadow-lg py-4 px-6 rounded-md appearance-none text-neutral-600' value={priceFilter}
                            onChange={(e) => {
                                setPriceFilter(e.target.value as PriceFilterKey)
                            }}
                        >
                            <option value="">All Prices</option>
                            <option value="under-10m">Less than 10M</option>
                            <option value="10m-20m">10M - 20M</option>
                            <option value="20m-30m">20M - 30M</option>
                            <option value="above-30m">Above 30M</option>
                        </select>

                        {/* Custom caret */}
                        <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary'>
                            <ChevronDown color='gray' size={24} />
                        </div>
                    </div>

                    {/* Location Filter */}
                    <div className='bg-white shadow-lg flex items-center  py-4 px-6 rounded-md w-full gap-4 hover:outline'>
                        
                        <MapPin color='gray' size={32} />

                        <input
                            type="text"
                            placeholder='Enter location' 
                            className='w-full outline-0'
                            onChange={(e) => {
                                setLocationFilter(e.target.value)
                            }}
                            value={locationFilter}
                        />
                    </div>

                </section>
            </div>


        </section>
    )
}

export default SearchPanel;