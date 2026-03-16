import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '../../ui/Buttons/button'
import { deleteListing } from '@/state/listings/listingsSlice'
import { useDispatch } from 'react-redux'
import type { DeleteListingModalProps } from '@/types/Listing'
import { Trash2Icon } from 'lucide-react'

const DeleteListingsModal = ({ listingId }: DeleteListingModalProps) => {
    const dispatch = useDispatch();
  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    Delete
                    <Trash2Icon size={18} color='rgba(255,0,0,0.6)' />
                </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='border-0 min-w-fit bg-bg-main px-16 py-8 gap-16'>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your listing.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => dispatch(deleteListing(listingId))}>
                    Yes, Delete this listing
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteListingsModal
