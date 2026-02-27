import type { FilterProp } from '../../types/UiTypes';
import { useState, useEffect, useContext } from 'react';
import { ListingContext } from '../../context/ListingContext/createListingContext';
import { Search } from 'lucide-react'


type PriceFilterKey = 'under-10m' | '10m-20m' | '20m-30m' | 'above-30m';

function FilterPanel({ filterFunction }: FilterProp){
    const [priceFilter, setPriceFilter] = useState<PriceFilterKey>(); 
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const context = useContext(ListingContext);

    if(! context){
        throw new Error('No Context available yet')
    } 

    const { listings } = context;

    useEffect(() => {
        const priceMatch: Record<string, (price: number) => boolean> = {
            'under-10m': (price: number) => price < 10000000,
            '10m-20m': (price: number) => 10000000 <= price && price <= 20000000,
            '20m-30m': (price: number) => 20000000 <= price && price <= 30000000,
            'above-30m': (price: number) => price > 30000000
        }

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

        handleFilter()
    }, [priceFilter, locationFilter, listings, filterFunction, searchValue])

    return (
        <section>
            <h3>Filter by:</h3>
            <div
                className='flex gap-16'
            >
                <article>
                    <p>
                        Price
                    </p>
                    <select
                        name="price" id="price" title='price' className='bg-white shadow-lg p-3 rounded-full'
                        onChange={(e) => {
                            setPriceFilter(e.target.value as PriceFilterKey)
                        }}
                        value={priceFilter}
                    >
                        <option value="">All Prices</option>
                        <option value="under-10m">Less than 10M</option>
                        <option value="10m-20m">10M - 20M</option>
                        <option value="20m-30m">20M - 30M</option>
                        <option value="above-30m">Above 30M</option>
                    </select>
                </article>

                <article>
                    <p>
                        Location
                    </p>
                    <input
                        type="text"
                        placeholder='Enter location' 
                        className='rounded-full w-full p-3 bg-white shadow-lg'
                        onChange={(e) => {
                            setLocationFilter(e.target.value)
                        }}
                        value={locationFilter}
                    />
                </article>
            </div>

            <div className='flex items-center gap-16 rounded-full w-full bg-white shadow-lg p-16 w-max-lg hover:outline'>
                <Search color='gray' size={24} />
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
        </section>
    )
}

export default FilterPanel;