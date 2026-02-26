import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { ListingContext } from '../../context/ListingContext/createListingContext';
import type { Listing } from '../../types/Listing';

const ListingDetails = () => {
    const { listingId } = useParams();

    const context = useContext(ListingContext)

    if(!context){
        throw new Error('Context not found')
    }

    const { listings } = context;

    const listing = listings.find((listing: Listing) => listing.id === listingId)

  return (
    <div>
        {listing ? listing.title : ''}
    </div>
  )
}

export default ListingDetails
