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
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import type { Listing } from '@/types/Listing'
import { supabase } from '@/config/supabase'

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
    const navigate = useNavigate()
    const [existingListing, setExistingListing] = useState<Listing | null>(null)

    const isEditMode = !!existingListing

    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    const { register, handleSubmit, formState: { errors }, setValue, control, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })

    // Selected Elements Logic
    const selectedFeatures = useWatch({ control, name: 'features' })
    const current = selectedFeatures ?? []
    const selectedPropertyType = useWatch({ control, name: 'propertyType' })
    const selectedStatus = useWatch({ control, name: 'status' })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setImages(prev => [...prev, ...files])
        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviews(prev => [...prev, ...newPreviews])
    }

    const uploadImage = async (file: File) => {
        const { data: userData } = await supabase.auth.getUser()
        const user = userData.user

        if (!user) return null

        const fileName = `${user.id}-${Date.now()}-${file.name}`

        const { error } = await supabase.storage
            .from('listing-images')
            .upload(fileName, file)

        if (error) {
            console.error(error)
            return null
        }

        const { data } = supabase.storage
            .from('listing-images')
            .getPublicUrl(fileName)

        return data.publicUrl
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
        if (!listingId) return // Skip fetch if there's no Id

        // if listingId is provided, find the existing listing from the database
        const fetchExistingListing = async (id: string) => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings/${id}`);

            setExistingListing(data)
            setPreviews(data.images ?? [])

            reset({
            title: data.title ?? '',
            description: data.description ?? '',
            location: data.location ?? '',
            city: data.city ?? '',
            state: data.state ?? '',
            propertyType: data.propertyType ?? '',
            bedrooms: data.bedrooms ?? 0,
            bathrooms: data.bathrooms ?? 0,
            sizeSqft: data.sizeSqft ?? 0,
            price: data.price ?? 0,
            status: data.status ?? 'For Sale',
            features: data.features ?? [],
        })
            
        }

        fetchExistingListing(listingId)
    }, [listingId, reset])
    

    // Image preview logic
    useEffect(() => {
        return () => {
            previews.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url)
                }
            })
        }
    }, [previews])

    // Submission logic
    const onSubmit = async (values: FormValues) => {
        try {
            // 1. Upload all new images to Supabase
            const uploadedImageUrls = await Promise.all(
                images.map(file => uploadImage(file))
            )

            // remove failed uploads (nulls)
            const validUploadedUrls = uploadedImageUrls.filter(Boolean) as string[]

            // Keep existing images (only real URLs, not blob)
            const existingUrls = previews.filter(p => !p.startsWith('blob:'))

            // Merge both
            const allImages = [...existingUrls, ...validUploadedUrls]

            if (isEditMode && existingListing) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/listings/${existingListing.id}`,
                    {
                        ...values,
                        images: allImages
                    }
                )
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/listings`,
                    {
                        ...values,
                        images: allImages
                    }
                )
            }

            resetForm()
            navigate('/admin') // or wherever
        } catch (err) {
            console.error(err)
        }
    }

    // The actual Form
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
                        value={selectedPropertyType}
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
                        value={selectedStatus ?? 'For Sale'}
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