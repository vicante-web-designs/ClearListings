import { Link, type LinkProps  } from 'react-router-dom'

const PageLink = ({ to, children }: LinkProps) => {
  return (
    <Link to={to} className='bg-primary hover:bg-secondary shadow-primary text-white px-6 py-3 transition-all ease-in duration-200 w-fit'>
        {children}
    </Link>
  )
}

export default PageLink
