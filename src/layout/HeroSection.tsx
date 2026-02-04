function HeroSection(){
    return(
        <section className='h-screen'>
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
                    alt=""
                    className='absolute -z-1 w-full h-full'></img>
                <div
                    className='w-full h-full bg-[rgba(0,0,0,0.3)]'
                ></div>
            </div>
        </section>
    )
}

export default HeroSection;

