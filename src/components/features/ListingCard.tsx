import type { ListingCardProps } from '../../types/Listing'

function ListingCard({id, images, title, location, price, bedrooms, type, availability }: ListingCardProps){
    return(
        <article className='w-full max-w-sm h-105 bg-white rounded-3xl shadow-md overflow-hidden relative' id={id}> 
            {
                images && images.length > 0 ? (
                    <img
                        src={images[0]} alt="" 
                        className='w-full h-full object-cover relative z-0'
                    />
                ) : (
                    <img src="" alt="" />
                )
            }

            <div className='absolute z-10  h-fit top-0 left-0 right-0 m-4 flex justify-between items-center'>
                <p className={
                    ` bg-[rgba(255,255,255,0.9)] font-bold py-2 px-4 rounded-full ${availability === "available"
                        ? "text-[rgba(21,128,61,0.8)]"
                        : availability === "pending"
                        ? "text-[rgba(161,98,7,0.8)]"
                        : "text-[rgba(185,28,28,0.8)]"
                    }`
                }>
                    {availability}
                </p>
            </div>

            <div className='absolute z-2 bg-[rgba(255,255,255,0.9)] h-fit bottom-0 left-0 right-0 m-3 rounded-2xl py-4 px-6 flex flex-col gap-2'>
                <h3 className='text-xl font-bold line-clamp-2 capitalize'>
                    {title}
                </h3>

                <div className="flex justify-between">
                        
                    <p className='font-bold text-blue-600'>
                        &#8358;{Number(price).toLocaleString()}
                    </p>

                    <p>
                        <span>📍</span> {location}
                    </p>
                </div>

                <div className="flex justify-between">
                    <p className='text-gray-700 flex items-center gap-1'>
                        <span className='font-bold text-black'>{bedrooms}</span> 🛏️
                    </p>

                    
                    <p>
                        Type: <span className='font-bold text-black'>{type}</span>
                    </p>
                </div>

            </div>
        </article>
    )
}

export default ListingCard