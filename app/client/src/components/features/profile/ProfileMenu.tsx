import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/Buttons/button'
import { useSelector } from 'react-redux'
import { selectIsAdmin, selectIsAgent } from '@/selectors/authSelectors'
import { useNavigate } from 'react-router-dom'

const ProfileMenu = () => {
    const navigate = useNavigate()
    const isAdmin = useSelector(selectIsAdmin)
    const isAgent = useSelector(selectIsAgent)
    console.log(isAdmin)
    
  return (
    <DropdownMenu>
        {/* Avatar acts as the trigger */}
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="rounded-full">
          <Avatar>
            <AvatarImage src="/images/profile.jpg" alt="@victory" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown content */}
      <DropdownMenuContent align="end">
        <div>
            {
                isAdmin || isAgent ? (
                    <DropdownMenuItem>
                        <Button variant='link' className='border-primary border w-full hover:bg-primary hover:text-white' onClick={() => navigate('./createListing')}>
                            Create New Listing
                        </Button>
                    </DropdownMenuItem>
                ) : null
            }
            <DropdownMenuItem>My Profile</DropdownMenuItem>
        </div>

        <div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log Out</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu
