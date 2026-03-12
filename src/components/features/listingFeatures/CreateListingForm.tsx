import { z } from 'zod/v3'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Buttons/button'
import { Field, FieldLabel, FieldError } from '@/components/ui/forms/field'
import { Input } from '@/components/ui/forms/input'
import { Textarea } from '@/components/ui/forms/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/forms/select'
import { Checkbox } from '@/components/ui/forms/checkbox'
import { Label } from '@/components/ui/forms/label'
import { useEffect, useState } from 'react'
import { ListingObj } from '@/data/ListingData'
import { useDispatch, useSelector } from 'react-redux'
import { createListing, updateListing } from '@/state/listings/listingsSlice'
import type { AppDispatch, RootState } from '@/state/store'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    location: z.string().min(1, 'Location is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    propertyType: z.string().min(1, 'Property type is required'),
    bedrooms: z.coerce.number().min(1, 'At least 1 bedroom required'),
    bathrooms: z.coerce.number().min(1, 'At least 1 bathroom required'),
    sizeSqft: z.coerce.number().min(1, 'Size is required'),
    price: z.coerce.number().min(1, 'Price is required'),
    status: z.enum(['For Sale', 'For Rent']),
    features: z.array(z.string()).min(1, 'Select at least one feature'),
})

type FormValues = z.infer<typeof formSchema>

const propertyTypes = [
    'Apartment', 'Duplex', 'Flat', 'Detached House',
    'Studio', 'Penthouse', 'Bungalow', 'Villa',
    'Shortlet', 'Terraced House', 'Semi-Detached'
]

const listingFeatures = [
    'Swimming Pool', 'Gym', 'Garden', 'Garage',
    'Balcony', 'Fireplace', 'Air Conditioning',
    'Security System', 'Solar Panels', 'Smart Home Features'
]

interface CreateListingFormProps {
    listingId?: string // optional — if provided, form is in edit mode
}

const CreateListingForm = ({ listingId }: CreateListingFormProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    // if listingId is provided, find the existing listing from Redux
    const existingListing = useSelector((state: RootState) =>
        listingId ? state.listings.listingValue.find(l => l.id === listingId) : undefined
    )

    const isEditMode = !!existingListing

    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>(
        existingListing?.images ?? [] // pre-fill previews with existing images
    )

    const { register, handleSubmit, formState: { errors }, setValue, control, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: existingListing?.title ?? '',
            description: existingListing?.description ?? '',
            location: existingListing?.location ?? '',
            city: existingListing?.city ?? '',
            state: existingListing?.state ?? '',
            propertyType: existingListing?.propertyType ?? '',
            bedrooms: existingListing?.bedrooms ?? 0,
            bathrooms: existingListing?.bathrooms ?? 0,
            sizeSqft: existingListing?.sizeSqft ?? 0,
            price: existingListing?.price ?? 0,
            status: existingListing?.status as 'For Sale' | 'For Rent' ?? 'For Sale',
            features: existingListing?.features ?? [],
        }
    })

    const selectedFeatures = useWatch({ control, name: 'features' })
    const current = selectedFeatures ?? []

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setImages(prev => [...prev, ...files])
        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviews(prev => [...prev, ...newPreviews])
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => {
            URL.revokeObjectURL(prev[index])
            return prev.filter((_, i) => i !== index)
        })
    }

    const resetForm = () => {
        reset()
        setImages([])
        setPreviews([])
    }

    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url))
        }
    }, [previews])

    const onSubmit = (values: FormValues) => {
        // new image files converted to URLs, merged with existing string URLs
        const newImageUrls = images.map(file => URL.createObjectURL(file))
        const allImages = [
            ...previews.filter(p => typeof p === 'string' && !p.startsWith('blob:')), // keep existing non-blob URLs
            ...newImageUrls
        ]

        if (isEditMode && existingListing) {
            // update existing listing
            const updatedListing = {
                ...existingListing,
                ...values,
                images: allImages.length > 0 ? allImages : existingListing.images,
            }
            dispatch(updateListing(updatedListing))
            navigate(`/listings/${existingListing.id}`)
        } else {
            // create new listing
            const newListing = new ListingObj(
                crypto.randomUUID(),
                values.title,
                values.price,
                values.location,
                values.city,
                values.state,
                values.propertyType,
                values.bedrooms,
                values.bathrooms,
                values.sizeSqft,
                allImages,
                values.description,
                values.features,
                values.status,
                new Date().toISOString(),
            )
            dispatch(createListing(newListing))
            resetForm()
        }
    }

    return (
        <div className='w-full max-w-7xl mx-auto py-12 px-6'>

            <article className='text-center flex flex-col items-center gap-2 mb-12'>
                <h2>{isEditMode ? 'Edit Listing' : 'List Your Property'}</h2>
                <p className='max-w-6xl'>
                    {isEditMode
                        ? 'Update your listing details below.'
                        : 'Fill out the form below to share your property with thousands of potential clients.'
                    }
                </p>
            </article>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>

                <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input placeholder="e.g. Luxury 4-Bedroom Duplex" {...register('title')} />
                    <FieldError errors={[errors.title]} />
                </Field>

                <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea placeholder="Describe the property..." rows={4} {...register('description')} />
                    <FieldError errors={[errors.description]} />
                </Field>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Field>
                        <FieldLabel>Location</FieldLabel>
                        <Input placeholder="e.g. GRA" {...register('location')} />
                        <FieldError errors={[errors.location]} />
                    </Field>
                    <Field>
                        <FieldLabel>City</FieldLabel>
                        <Input placeholder="e.g. Port Harcourt" {...register('city')} />
                        <FieldError errors={[errors.city]} />
                    </Field>
                    <Field>
                        <FieldLabel>State</FieldLabel>
                        <Input placeholder="e.g. Rivers State" {...register('state')} />
                        <FieldError errors={[errors.state]} />
                    </Field>
                </div>

                <Field>
                    <FieldLabel>Property Type</FieldLabel>
                    <Select
                        onValueChange={(val) => setValue('propertyType', val)}
                        defaultValue={existingListing?.propertyType}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                            {propertyTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldError errors={[errors.propertyType]} />
                </Field>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Field>
                        <FieldLabel>Bedrooms</FieldLabel>
                        <Input type="number" min={0} {...register('bedrooms', { valueAsNumber: true })} />
                        <FieldError errors={[errors.bedrooms]} />
                    </Field>
                    <Field>
                        <FieldLabel>Bathrooms</FieldLabel>
                        <Input type="number" min={0} {...register('bathrooms', { valueAsNumber: true })} />
                        <FieldError errors={[errors.bathrooms]} />
                    </Field>
                    <Field>
                        <FieldLabel>Size (sqft)</FieldLabel>
                        <Input type="number" min={0} {...register('sizeSqft', { valueAsNumber: true })} />
                        <FieldError errors={[errors.sizeSqft]} />
                    </Field>
                </div>

                <Field>
                    <FieldLabel>Price (₦)</FieldLabel>
                    <Input type="number" min={0} placeholder="e.g. 25000000" {...register('price', { valueAsNumber: true })} />
                    <FieldError errors={[errors.price]} />
                </Field>

                <Field>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                        onValueChange={(val) => setValue('status', val as 'For Sale' | 'For Rent')}
                        defaultValue={existingListing?.status ?? 'For Sale'}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="For Sale">For Sale</SelectItem>
                            <SelectItem value="For Rent">For Rent</SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldError errors={[errors.status]} />
                </Field>

                <Field>
                    <FieldLabel>Features</FieldLabel>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-2'>
                        {listingFeatures.map(feature => (
                            <div key={feature} className='flex items-center gap-2'>
                                <Checkbox
                                    id={feature}
                                    checked={current.includes(feature)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setValue('features', [...current, feature])
                                        } else {
                                            setValue('features', current.filter((f: string) => f !== feature))
                                        }
                                    }}
                                />
                                <Label htmlFor={feature} className='font-light text-2xs tracking-wide-2 cursor-pointer'>
                                    {feature}
                                </Label>
                            </div>
                        ))}
                    </div>
                    <FieldError errors={[errors.features]} />
                </Field>

                <Field>
                    <FieldLabel>Images</FieldLabel>
                    <div className='border border-dashed border-border p-8 text-center hover:border-secondary transition-colors duration-300'>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            id="images"
                            className='hidden'
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="images" className='cursor-pointer text-muted-foreground text-xs tracking-wide-2 uppercase'>
                            Click to upload images
                        </label>
                    </div>

                    {previews.length > 0 && (
                        <div className='flex flex-wrap gap-3 mt-2'>
                            {previews.map((preview, index) => (
                                <div key={index} className='relative w-24 h-24'>
                                    <img
                                        src={preview}
                                        alt={`preview ${index}`}
                                        className='w-full h-full object-cover'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeImage(index)}
                                        className='absolute -top-2 -right-2 bg-primary text-white w-5 h-5 text-xs flex items-center justify-center'
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </Field>

                <div className='flex gap-4 w-full'>
                    {isEditMode && (
                        <Button
                            variant='outline'
                            type='button'
                            className='mt-4'
                            onClick={() => navigate(`/listings/${existingListing?.id}`)}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button variant='default' type='submit' className=' mt-4'>
                        {isEditMode ? 'Save Changes' : 'Publish Listing'}
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default CreateListingForm