import { useParams } from 'react-router-dom'
import CreateListingForm from './CreateListingForm'

const EditListing = () => {
    const { listingId } = useParams()

    return (
        <main>
            <CreateListingForm listingId={listingId} />
        </main>
    )
}

export default EditListing