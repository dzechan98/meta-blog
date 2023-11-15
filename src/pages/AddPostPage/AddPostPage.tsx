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
import Button from '../../components/common/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/auth-context'

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
    const { userInfo } = useAuth()
    const [category, setCategory] = useState<OptionType | null>(null)
    const [options, setOptions] = useState<OptionType[]>([] as OptionType[])
    const [imageURL, setImageURL] = useState<string>('')
    const [removeImage, setRemoveImage] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>('')
    const [progressUpload, setProgressUpload] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            categoryId: '',
            imageURL: ''
        },
        validationSchema,
        onSubmit: async (values: FormDataAddPost, { resetForm }) => {
            formik.values.categoryId = String(category?.id)
            formik.values.imageURL = String(imageURL)
            try {
                await addDoc(collection(db, 'posts'), {
                    ...values,
                    avatar: userInfo?.photoURL,
                    userId: userInfo?.uid,
                    author: userInfo?.displayName,
                    like: 0,
                    createdAt: serverTimestamp()
                })
                resetForm()
                setImageURL('')
                setCategory(null)
                toast.success('Created new post successfully!!!')
            } catch (error) {
                console.log(error)
            }
        }
    })

    const handleSelectedOption = (selected: OptionType | null) => {
        setCategory(selected)
    }

    const handleUploadImage = (file: File): void => {
        const storage = getStorage()
        const metadata = {
            contentType: 'image/jpeg'
        }
        const storageRef = ref(storage, 'images/' + file.name)
        setFileName(file.name)
        const uploadTask = uploadBytesResumable(storageRef, file, metadata)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                setProgressUpload(true)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break
                    case 'storage/canceled':
                        break
                    case 'storage/unknown':
                        break
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL)
                    setRemoveImage(false)
                    setProgressUpload(false)
                    setImageURL(downloadURL)
                })
            }
        )
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
        <section className='w-full mb-10'>
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
                                value={formik.values.description}
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
                            <UploadImage
                                imageURL={imageURL}
                                removeImage={removeImage}
                                fileName={fileName}
                                progress={progressUpload}
                                setRemoveImage={setRemoveImage}
                                setImageURL={setImageURL}
                                handleUploadImage={handleUploadImage}
                            />
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
        </section>
    )
}

export default AddPostPage
