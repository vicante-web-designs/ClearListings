const ListingLoadingState = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <article key={i} className='w-full flex flex-col h-130 justify-between animate-pulse'>
          <div>
            <div className='w-full h-68 bg-neutral-300 rounded-md' />
            <article className='py-2 flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <div className='h-6 bg-neutral-300 rounded w-3/4' />
                <div className='h-5 bg-neutral-300 rounded w-1/3' />
              </div>
            </article>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='h-4 bg-neutral-300 rounded w-2/3' />
            <div className='h-10 bg-neutral-300 rounded w-full' />
          </div>
        </article>
      ))}
    </>
  )
}

export default ListingLoadingState