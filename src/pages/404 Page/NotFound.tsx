import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <section className='min-h-screen items-center justify-center flex mx-20'>
        <section className='flex flex-col gap-32 items-center'>
            <h1 className='text-5xl text-center text-primary'>
                <span className=''>Oops...</span> looks like you've taken a wrong turn. 
            </h1>

            <p className='font-bold text-center'>
                The page you're looking for doesn't exist. <br /> Don't worry, it happens to the best of us! <br /> Let's get you back on track.
            </p>

                <Link to='/'> 
                   <Button variant='default' type='button'>
                        Go back home
                    </Button>
                </Link>      
            
        </section>  
    </section>
  )
}

export default NotFound
