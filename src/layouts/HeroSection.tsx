const HeroSection = () => {
    return(
        <section className='h-screen relative'>
            <div className='relative w-full h-screen'>
                <img
                    sizes="(max-width: 1084px) 100vw, 1084px"
                    srcSet="
                    /Images/Hero/Hero_Image/Hero_Image_w_200.jpg 200w,
                    /Images/Hero/Hero_Image/Hero_Image_w_502.jpg 502w,
                    /Images/Hero/Hero_Image/Hero_Image_w_697.jpg 697w,
                    /Images/Hero/Hero_Image/Hero_Image_w_882.jpg 882w,
                    /Images/Hero/Hero_Image/Hero_Image_w_1045.jpg 1045w,
                    /Images/Hero/Hero_Image/Hero_Image_w_1084.jpg 1084w"
                    src="/Images/Hero/Hero_Image/Hero_Image_w_1084.jpg"
                    alt="Hero Section Image"
                    className='absolute -z-1 w-full h-full'></img>
                <div
                    className='w-full h-full bg-[rgba(0,0,0,0.7)]'
                ></div>
            </div>

            <article className='absolute z-2 *:text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/12 w-full h-fit flex flex-col gap-8 items-center'>
                <h1 className='text-white'>
                    Find Your Next Home, <span className='text-primary'>
                        Faster.
                    </span>
                </h1>

                <h2 className='text-neutral-300'>
                    Browse verified listings in real estate and architecture, designed for modern buyers and sellers.
                </h2>
            </article>
        </section>
    )
}

export default HeroSection;

