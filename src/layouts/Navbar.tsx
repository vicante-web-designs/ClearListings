import Logo from '../../public/Images/Logo/ClearListing_Logo.png'
import Button from '../components/ui/Button'
import NavLink from '../components/ui/NavLink'
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
                ? 'top-4 fixed shadow-2xl transition-all duration-200 ease-in-out *:text-black'
                : 'mb-20'
            }`}>

                <img src={Logo} alt='ClearListing Logo' className='h-12 w-auto rounded-full'/>

                <NavLink children='HOME' to='/' />

                <NavLink children='LISTINGS' to='/listings' />
                
                <NavLink children='ABOUT' to='/' />
                
                

                <Button 
                    label='Contact'
                    type='button'
                    variant='secondary'
                />

            </nav>
        </>
    )
}

export default Navbar