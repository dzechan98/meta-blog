import { useEffect, useState } from 'react'
import Field from '../../components/common/Field'
import Heading from '../../components/common/Heading'
import Input from '../../components/common/Input'
import Label from '../../components/common/Label'
import Textarea from '../../components/common/Textarea'
import Select from 'react-select'
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../../config/firebase'
import UploadImage from '../../components/common/UploadImage'
import { handleUploadImage } from '../../utils/fn'
import Button from '../../components/common/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface OptionType {
    id: string
    label: string
    value: string
}

interface FormDataAddPost {
    title: string
    description: string
    categoryId: string
    imageURL: string
}

const validationSchema = Yup.object({
    title: Yup.string().required('Please enter the title for the new post'),
    description: Yup.string().required('Please enter the description for the new post'),
    categoryId: Yup.string(),
    imageURL: Yup.string()
})

const AddPostPage = () => {
    const [category, setCategory] = useState<OptionType | null>(null)
    const [options, setOptions] = useState<OptionType[]>([] as OptionType[])
    const [imageURL, setImageURL] = useState<string | null>(null)
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            categoryId: '',
            imageURL: ''
        },
        validationSchema,
        onSubmit: async (values: FormDataAddPost) => {
            formik.values.categoryId = String(category?.id)
            formik.values.imageURL = String(imageURL)
            try {
                await addDoc(collection(db, 'posts'), {
                    ...values,
                    createdAt: serverTimestamp()
                })
                console.log(values)
            } catch (error) {
                console.log(error)
            }
        }
    })

    const handleSelectedOption = (selected: OptionType | null) => {
        setCategory(selected)
    }

    const getErrorFieldName = (name: 'title' | 'description') => {
        if (formik.errors[name] && formik.touched[name]) {
            return formik.errors[name]
        }
        return null
    }

    useEffect(() => {
        const getCategories = async () => {
            const optionData: OptionType[] = []
            try {
                const querySnapshot = await getDocs(collection(db, 'categories'))
                querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
                    optionData.push({ id: doc.id, label: doc.data().name, value: doc.data().name })
                })
                setOptions(optionData)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    }, [])
    return (
        <div className='w-full mb-10'>
            <Heading className='mb-6'>Add new post</Heading>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex items-start gap-6 mb-10'>
                    <div className='w-1/2'>
                        <Field>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                                name='title'
                                placeholder='Enter the title for the new post'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={getErrorFieldName('title')}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                                id='description'
                                placeholder='Enter the description for the new post'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={getErrorFieldName('description')}
                            />
                        </Field>
                    </div>
                    <div className='w-1/2'>
                        <Field>
                            <Label htmlFor='title'>Category</Label>
                            <Select
                                options={options}
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        padding: '4px',
                                        borderColor: 'transparent',
                                        borderRadius: '6px'
                                    })
                                }}
                                onChange={handleSelectedOption}
                                placeholder='Select category for the new post'
                            />
                        </Field>
                        <Field>
                            <Label htmlFor='upload_image'>Image</Label>
                            <UploadImage handleUploadImage={handleUploadImage} setImageURL={setImageURL} />
                        </Field>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <Button
                        type='submit'
                        size='large'
                        loading={!!formik.isSubmitting}
                        disabled={!!(Object.keys(formik.errors).length || formik.isSubmitting) || !category}
                    >
                        Add new post
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddPostPage
