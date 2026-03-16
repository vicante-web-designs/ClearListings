const ListingLoadingState = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <article key={i} className='w-100 flex flex-col h-130 justify-between animate-pulse'>

          {/* Image skeleton — matches h-68 */}
          <div>
            <div className='w-full h-68 bg-neutral-400' />

            {/* Title and price skeleton — matches py-2 flex flex-col gap-6 */}
            <article className='py-2 flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <div className='h-6 bg-neutral-400 w-3/4' />
                <div className='h-5 bg-neutral-400 w-1/3' />
              </div>
            </article>
          </div>

          {/* Location and button skeleton */}
          <div className='flex flex-col gap-2'>
            <div className='h-4 bg-neutral-400 w-2/3' />
            <div className='h-10 bg-neutral-400 w-full' />
          </div>

        </article>
      ))}
    </>
  )
}

export default ListingLoadingState