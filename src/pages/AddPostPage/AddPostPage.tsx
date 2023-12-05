import { useEffect, useState } from 'react'
import Field from '../../components/common/Field'
import Heading from '../../components/common/Heading'
import Input from '../../components/common/Input'
import Label from '../../components/common/Label'
import Select from 'react-select'
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '../../config/firebase'
import UploadImage from '../../components/common/UploadImage'
import Button from '../../components/common/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/auth-context'
import { capitalizeFirstLetterOfEachWord } from '../../utils/fn'
import { useCategory } from '../../contexts/category-context'
import TextEditor from '../../components/common/TextEditor'
import ToggleCheckbox from '../../components/common/ToggleCheckbox'

export interface OptionType {
    id: string
    label: string
    value: string
}

interface FormDataAddPost {
    title: string
    categoryId: string
    content: string
    imageURL: string
    featured: boolean
}

const validationSchema = Yup.object({
    title: Yup.string().required('Please enter the title for the new post'),
    categoryId: Yup.string(),
    content: Yup.string(),
    imageURL: Yup.string(),
    featured: Yup.boolean()
})

const AddPostPage = () => {
    const { userInfo } = useAuth()
    const { checkAddCategory } = useCategory()
    const [category, setCategory] = useState<OptionType | null>(null)
    const [options, setOptions] = useState<OptionType[]>([] as OptionType[])
    const [imageURL, setImageURL] = useState<string>('')
    const [removeImage, setRemoveImage] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const [progressUpload, setProgressUpload] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const formik = useFormik({
        initialValues: {
            title: '',
            categoryId: '',
            content: '',
            imageURL: '',
            featured: false
        },
        validationSchema,
        onSubmit: async (values: FormDataAddPost, { resetForm }) => {
            formik.values.content = String(content)
            formik.values.categoryId = String(category?.id)
            formik.values.imageURL = String(imageURL)
            formik.values.featured = checked
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
                setContent('')
                setChecked(false)
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

    const getErrorFieldName = (name: 'title') => {
        if (formik.errors[name] && formik.touched[name]) {
            return formik.errors[name]
        }
        return null
    }

    useEffect(() => {
        const getCategories = async () => {
            const optionData: OptionType[] = []
            onSnapshot(collection(db, 'categories'), (snapshot) => {
                snapshot.forEach((doc) => {
                    optionData.push({
                        id: doc.id,
                        label: capitalizeFirstLetterOfEachWord(doc.data().name),
                        value: capitalizeFirstLetterOfEachWord(doc.data().name)
                    })
                })
            })
            setOptions(optionData)
        }
        getCategories()
    }, [checkAddCategory])

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
                        <div className='flex items-center gap-2'>
                            <ToggleCheckbox label='Featured post' checked={checked} setChecked={setChecked} />
                        </div>
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
                <div className='bg-light mb-10'>
                    <Field>
                        <Label htmlFor='content'>Content</Label>
                        <div className='bg-light'>
                            <TextEditor content={content} setContent={setContent} />
                        </div>
                    </Field>
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
