import { useNavigate } from 'react-router-dom'
import Logo from '../../public/Images/Logo/ClearListing_Logo.png'
import Button from '../components/ui/Button'
import NavLink from '../components/ui/NavLink'

function Navbar(){
    const navigate = useNavigate();

    return(
        <nav className='rounded-full h-20 px-24
         py-16 shadow-2xl bg-blue-100 flex items-center justify-between mx-8 my-10 fixed z-999 left-0 right-0 '>

            <img src={Logo} alt="ClearListing Logo" className='h-full rounded-full'/>

            <div>
                <NavLink 
                    label='Home'
                    link='#'
                />
                <NavLink 
                    label='Listings'
                    link='#'
                />
                <NavLink 
                    label='About'
                    link='#'
                />
                <NavLink 
                    label='Contact'
                    link='#'
                />
                <NavLink 
                    label='Admin'
                    link='#'
                />
            </div>

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