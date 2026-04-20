import { Button } from '@/components/ui/Buttons/button'
import NavLink from '../components/ui/links/NavLink'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAdmin, selectIsAgent, selectIsLoading, selectIsUser } from '@/selectors/authSelectors'
import ProfileMenu from '@/components/features/profile/ProfileMenu'

const Navbar = () => {
    // Auth roles
    const isUser = useSelector(selectIsUser)
    const isAdmin = useSelector(selectIsAdmin)
    const isAgent = useSelector(selectIsAgent)
    const isLoading = useSelector(selectIsLoading)
    const isAuthenticated = !isLoading && (isAdmin || isAgent || isUser)

    // Navigation
    const navigate = useNavigate();
    const [isSticky, setIsSticky] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 80)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return(
        <>
            {/* placeholder to prevent content jump when navbar becomes fixed */}
            <div className='h-0'/>

            <nav className={`h-fit py-2 px-8 flex items-center fixed justify-between z-50 left-0 right-0 transition-all duration-500 ease-in-out w-full  ${
                isSticky
                ? 'fixed py-3 transition-all duration-200 ease-in-out bg-[rgba(133,107,71,0.8)] *:text-black backdrop-blur-lg'
                : 'mb-20'
            }`}>

                {/* Navigation Links */}
                <div className='flex justify-between w-1/3'>
                    <NavLink children='home' to='/' />  

                    <NavLink children='about' to='/about' />  
                </div> 

                {/* Placeholder Logo */}
                <NavLink to={'/'} className='w-1/3'>
                    <h3 className='text-primary font-serif underline underline-offset-8 decoration-secondary border-t-2 border-primary border-x-2 pl-2 pr-2.5 flex-1'>
                        LS
                    </h3>
                </NavLink>             
                
                <div className='w-1/3 flex justify-between items-center'>
                    <NavLink children='listings' to='/listings' />

                    {isLoading ? (
                        // show a placeholder that matches the button size
                        <div className='h-9 w-20 rounded-md bg-neutral-200 animate-pulse' />
                    ) : isAuthenticated ? (
                        <ProfileMenu />
                    ) : (
                        <Button variant='outline' onClick={() => navigate('/login')}>
                            Log In
                        </Button>
                    )}
                </div>

            </nav>
        </>
    )
}

export default Navbar