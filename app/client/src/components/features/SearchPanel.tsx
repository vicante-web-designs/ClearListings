import { Search, MapPin } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setFilter } from '@/state/slices/filters/filterSlice';
import PriceFilter from './priceFilter';

const SearchPanel = () => {
    const dispatch = useDispatch();

    return (
        <section className='flex justify-center'>
            <div className='flex flex-col gap-4 w-[80%] max-w-7xl items-center'>

                {/* Search Bar */}
                <div className='flex items-center gap-4 rounded-md w-full bg-white shadow-lg py-4 p-6 hover:outline'>
                    <Search color='gray' size={32} />
                    <input
                        type="text"
                        title='search'
                        className='w-full outline-0'
                        placeholder='Search by name'
                        onChange={(e) => {
                            dispatch(setFilter({ key: 'title', value: e.target.value }))
                        }}
                    />
                </div>

                {/* Filter Panel */}
                <section className='flex  flex-col items-start gap-4 w-full'>                   

                    {/* Location Filter */}
                    <div className='bg-white shadow-lg flex items-center  py-4 px-6 rounded-md w-full gap-4 hover:outline'>
                        
                        <MapPin color='gray' size={32} />

                        <input
                            type="text"
                            placeholder='Enter location' 
                            className='w-full outline-0'
                            onChange={(e) => {
                                    dispatch(setFilter({ key: 'location', value: e.target.value }))
                            }}
                            
                        />
                    </div>

                    {/* All Price filters */}
                    <div className='flex gap-4'>

                        {/* Min Price Filter */}
                        <div>
                            <p className='text-md text-primary'>Min. Price</p>

                            <PriceFilter 
                                label='Enter Minimum Price'
                                filterKey='minPrice'
                            />
                        </div>

                        {/* Max Price Filter */}
                        <div>
                            <p className='text-md text-primary'>Max. Price</p>
                            <PriceFilter 
                            label='Enter Maximum Price'
                            filterKey='maxPrice'
                        />
                        </div>
                    </div>

                </section>
            </div>


        </section>
    )
}

export default SearchPanel;