import { Search, ChevronDown, MapPin } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchTerm, setPriceFilter, setLocationFilter } from '@/state/listings/listingsSlice';
import type { PriceFilterKey } from '@/types/filter';


const SearchPanel = () => {
    const dispatch = useDispatch();

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
                            dispatch(setSearchTerm(e.target.value))
                        }}
                    />
                </div>

                {/* Filter Panel */}
                <section className='flex items-start gap-16 w-full'>
                    
                    {/* Price Filter */}
                    <div className='relative'>
            
                        <select
                            name="price" id="price" title='price' className='bg-white shadow-lg py-4 px-6 rounded-md appearance-none text-neutral-600'
                            onChange={(e) => {
                                dispatch(setPriceFilter(e.target.value as PriceFilterKey))
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
                                dispatch(setLocationFilter(e.target.value))
                            }}
                        />
                    </div>

                </section>
            </div>


        </section>
    )
}

export default SearchPanel;