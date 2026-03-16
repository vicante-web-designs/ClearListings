import type { HeroSectionImageProps } from '../../../types/UiTypes'

const HeroSectionImage = ({ sizes, srcSet, src }: HeroSectionImageProps) => {
  return (
    <img
        sizes={sizes}
        srcSet={srcSet}
        src={src}
        alt="Hero Section Image"
        className='absolute -z-1 w-full h-full object-cover'></img>
  )
}

export default HeroSectionImage
