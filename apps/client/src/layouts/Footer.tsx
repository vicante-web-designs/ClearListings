const Footer = () => {
    const getCurrentYear = () => {
        const date = new Date();

        return date.getFullYear();
    }
    return(
        <footer className='flex justify-center bg-bg-secondary text-bg-main p-24 mt-40'>
            <span>
                &copy; {getCurrentYear()}  ClearListing - All rights reserved
            </span>
        </footer>
    )
}

export default Footer