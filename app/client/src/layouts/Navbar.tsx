import { Button } from '@/components/ui/Buttons/button'
import NavLink from '../components/ui/links/NavLink'
import { useState, useEffect } from 'react'

const Navbar = () => {
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

            <nav className={`h-20 px-8 flex items-center fixed justify-between z-50 left-0 right-0 transition-all duration-500 ease-in-out w-full  ${
                isSticky
                ? 'fixed shadow-2xl transition-all duration-200 ease-in-out bg-[rgba(219,212,202,1)] *:text-black backdrop-blur-lg'
                : 'mb-20'
            }`}>

                <NavLink to={'/'}>
                    <h3 className='text-primary font-serif underline underline-offset-8 decoration-secondary border-t-2 border-primary border-x-2 pl-2 pr-2.5'>
                        LS
                    </h3>
                </NavLink>

                <NavLink children='listings' to='/listings' />
                
                <NavLink children='about' to='/about' />

                <NavLink children='create listings' to='/createListing' />
                
                

                <Button variant='outline' type='button'>
                    Explore Listings
                </Button>

            </nav>
        </>
    )
}

export default Navbar