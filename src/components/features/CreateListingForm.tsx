import { z } from 'zod/v3'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Buttons/button'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { ListingObj } from '@/data/ListingData'
import { useDispatch } from 'react-redux'
import { createListing } from '@/state/listings/listingsSlice'

// ✅ Zod v4 schema
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
    status: z.enum(['For Sale', 'For Rent']),  // ✅ message handled differently in v4
    features: z.array(z.string()).min(1, 'Select at least one feature'),
})

// ✅ z.infer now correctly returns number instead of unknown
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

const CreateListingForm = () => {
    const dispatch = useDispatch()

    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            location: '',
            city: '',
            state: '',
            propertyType: '',
            bedrooms: 0,
            bathrooms: 0,
            sizeSqft: 0,
            price: 0,
            status: 'For Sale',
            features: [],
        }
    })

    const selectedFeatures = useWatch({ control, name: 'features'})

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

    const onSubmit = (values: FormValues) => {
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
            images,
            values.description,
            values.features,
            values.status,
            new Date().toISOString(),
        )

        dispatch(createListing(newListing))
    }

    return (
        <div className='w-full max-w-7xl mx-auto py-12 px-6'>

            <article className='text-center flex flex-col items-center gap-2 mb-12'>
                <h2>List Your Property</h2>
                <p className='max-w-6xl'>
                    Fill out the form below to share your property with thousands of potential clients.
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
                    <Select onValueChange={(val) => setValue('propertyType', val)}>
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
                    <Select onValueChange={(val) => setValue('status', val as 'For Sale' | 'For Rent')} defaultValue='For Sale'>
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
                                    checked={selectedFeatures?.includes(feature)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setValue('features', [...selectedFeatures, feature])
                                        } else {
                                            setValue('features', selectedFeatures.filter(f => f !== feature))
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

                <Button variant='default' type='submit' className='w-full mt-4'>
                    Publish Listing
                </Button>

            </form>
        </div>
    )
}

export default CreateListingForm