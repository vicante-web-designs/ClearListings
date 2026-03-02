import { Link, type LinkProps  } from 'react-router-dom'

const PageLink = ({ to, children }: LinkProps) => {
  return (
    <Link to={to} className='bg-blue-600 hover:bg-blue-400 shadow-blue-400 shadow-2xl text-white px-6 py-3 rounded-full transition-all ease-in duration-200 w-fit'>
        {children}
    </Link>
  )
}

export default PageLink
