import Logo from '../../public/Images/Logo/ClearListing_Logo.png'
import NavLink from '../components/ui/NavLink'

function Navbar(){

    return(
        <nav className='rounded-full h-20 px-24
         py-16 shadow-2xl bg-blue-100 flex items-center justify-between mx-8 my-10 fixed z-999 left-0 right-0 '>

            <img src={Logo} alt="ClearListing Logo" className='h-full rounded-full'/>

            <div className='flex w-full border justify-between'>
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
        </nav>
    )
}

export default Navbar