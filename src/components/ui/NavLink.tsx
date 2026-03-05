import { Link, type LinkProps  } from 'react-router-dom'


const NavLink = ({ to, children }: LinkProps) => {
  return (
    <Link to={to} className='text-white hover:text-secondary transition-all ease-in duration-150 w-fit'>
        <span className='nav-link'>
          {children}
        </span>
    </Link>
  )
}

export default NavLink
