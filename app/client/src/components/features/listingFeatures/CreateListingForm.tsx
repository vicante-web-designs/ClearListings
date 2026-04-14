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

    // Separate tracking for new files vs existing URLs
    const [newImages, setNewImages] = useState<File[]>([])  // Files to upload
    const [existingUrls, setExistingUrls] = useState<string[]>([])  // Already uploaded
    const [newPreviews, setNewPreviews] = useState<string[]>([])  // Preview of new files

    const { register, handleSubmit, formState: { errors }, setValue, control, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })

    const selectedFeatures = useWatch({ control, name: 'features' })
    const current = selectedFeatures ?? []
    const selectedPropertyType = useWatch({ control, name: 'propertyType' })
    const selectedStatus = useWatch({ control, name: 'status' })

    // Handle new image uploads
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setNewImages(prev => [...prev, ...files])
        
        const previews = files.map(file => URL.createObjectURL(file))
        setNewPreviews(prev => [...prev, ...previews])
    }

    // Upload image - simplified
    const uploadImage = async (file: File) => {
        const { data: userData } = await supabase.auth.getUser()
        const user = userData.user

        if (!user) return null
        
        const fileName = `${user.id}-${crypto.randomUUID()}-${file.name}`

        const { error } = await supabase.storage
            .from('listing-images')
            .upload(fileName, file)

        if (error) {
            console.error('Upload failed:', error)
            return null
        }

        const { data } = supabase.storage
            .from('listing-images')
            .getPublicUrl(fileName)

        return data.publicUrl
    }

    // Remove images correctly
    const removeExistingImage = (url: string) => {
        setExistingUrls(prev => prev.filter(u => u !== url))
    }

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index))
        
        // Clean up the preview blob URL
        URL.revokeObjectURL(newPreviews[index])
        setNewPreviews(prev => prev.filter((_, i) => i !== index))
    }

    const resetForm = () => {
        reset()
        setNewImages([])
        setNewPreviews([])
        setExistingUrls([])
    }

    // Load existing listing data
    useEffect(() => {
        if (!listingId) return

        const fetchExistingListing = async (id: string) => {
            const { data } = await axios.get(`${import.meta.env.API_URL}/api/listings/${id}`)

            setExistingListing(data)
            setExistingUrls(data.images ?? [])  // Store existing image URLs

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

    // Clean up preview URLs when component unmounts
    useEffect(() => {
        return () => {
            newPreviews.forEach(url => URL.revokeObjectURL(url))
        }
    }, [newPreviews])

    // Submit form
    const onSubmit = async (values: FormValues) => {
        try {
            // 1. Upload new images
            const uploadPromises = newImages.map(file => uploadImage(file))
            const uploadedUrls = await Promise.all(uploadPromises)

            // 2. Remove any failed uploads (null values)
            const successfulUploads = uploadedUrls.filter(url => url !== null) as string[]

            // 3. Combine existing URLs + new uploads
            const allImages = [...existingUrls, ...successfulUploads]

            // 4. Save to backend
            if (isEditMode && existingListing) {
                await axios.put(
                    `${import.meta.env.API_URL}/api/listings/${existingListing.id}`,
                    { ...values, images: allImages }
                )
            } else {
                await axios.post(
                    `${import.meta.env.API_URL}/api/listings`,
                    { ...values, images: allImages }
                )
            }

            resetForm()
            navigate('/admin')
        } catch (err) {
            console.error('Error saving listing:', err)
            alert('Failed to save. Please try again.')
        }
    }

    // The form JSX - UPDATE THE IMAGES SECTION
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
                {/* ... all your other fields stay the same ... */}
                
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

                {/* UPDATED IMAGES SECTION */}
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

                    {/* Show existing images */}
                    {existingUrls.length > 0 && (
                        <div className='mt-4'>
                            <p className='text-xs text-muted-foreground mb-2'>Existing Images:</p>
                            <div className='flex flex-wrap gap-3'>
                                {existingUrls.map((url, index) => (
                                    <div key={`existing-${index}`} className='relative w-24 h-24'>
                                        <img
                                            src={url}
                                            alt={`existing ${index}`}
                                            className='w-full h-full object-cover'
                                        />
                                        <button
                                            type='button'
                                            onClick={() => removeExistingImage(url)}
                                            className='absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full'
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Show new image previews */}
                    {newPreviews.length > 0 && (
                        <div className='mt-4'>
                            <p className='text-xs text-muted-foreground mb-2'>New Images:</p>
                            <div className='flex flex-wrap gap-3'>
                                {newPreviews.map((preview, index) => (
                                    <div key={`new-${index}`} className='relative w-24 h-24'>
                                        <img
                                            src={preview}
                                            alt={`new preview ${index}`}
                                            className='w-full h-full object-cover'
                                        />
                                        <button
                                            type='button'
                                            onClick={() => removeNewImage(index)}
                                            className='absolute -top-2 -right-2 bg-primary text-white w-5 h-5 text-xs flex items-center justify-center rounded-full'
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
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
                    <Button variant='default' type='submit' className='mt-4'>
                        {isEditMode ? 'Save Changes' : 'Publish Listing'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateListingForm