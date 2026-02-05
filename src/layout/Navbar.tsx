import { useNavigate } from 'react-router-dom'
import Logo from '../../public/Images/Logo/ClearListing_Logo.png'
import Button from '../components/ui/Button'
import NavLink from '../components/ui/NavLink'

function Navbar(){
    const navigate = useNavigate();

    return(
        <nav className='rounded-full h-20 px-4
         py-4 shadow-2xl bg-blue-100 flex items-center justify-between mx-8 my-10 fixed z-999 left-0 right-0 '>

            <img src={Logo} alt="ClearListing Logo" className='h-full rounded-full'/>

            <NavLink 
                label='Listings'
                link='#'
            />

            <Button
                label='Create listings'
                type='button'
                variant='danger'
                onClick={() => navigate('/createListings')}
            />
        </nav>
    )
}

export default Navbar