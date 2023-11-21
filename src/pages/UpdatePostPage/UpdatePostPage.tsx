import { useState, useEffect, useRef } from 'react'
import Heading from '../../components/common/Heading'
import Field from '../../components/common/Field'
import Label from '../../components/common/Label'
import Input from '../../components/common/Input'
import Select from 'react-select'
import { OptionType } from '../AddPostPage/AddPostPage'
import TextEditor from '../../components/common/TextEditor'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { capitalizeFirstLetterOfEachWord } from '../../utils/fn'
import { useCategory } from '../../contexts/category-context'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import { IPostProps } from '../../components/common/Post/Post'
import { toast } from 'react-toastify'

const validationSchema = Yup.object({
    title: Yup.string().required('Please enter the title for the new post'),
    content: Yup.string(),
    categoryId: Yup.string(),
    featured: Yup.boolean()
})

const UpdatePostPage = () => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const { checkAddCategory } = useCategory()
    const [category, setCategory] = useState<OptionType | null>(null)
    const [options, setOptions] = useState<OptionType[]>([] as OptionType[])
    const [content, setContent] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const selectedInputRef = useRef<any>(null)
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            categoryId: '',
            featured: false
        },
        validationSchema,
        onSubmit: async (values) => {
            formik.values.content = String(content)
            formik.values.categoryId = String(category?.id)
            formik.values.featured = checked
            try {
                await updateDoc(doc(db, 'posts', postId as string), {
                    ...values
                })
                toast.success('Update post successfully!!!')
                navigate('/dashboard/my-post')
            } catch (error) {
                console.log(error)
            }
            console.log(values)
        }
    })

    const handleSelectedOption = (selected: OptionType | null) => {
        setCategory(selected)
    }

    const getErrorFieldName = (name: 'title') => {
        if (formik.errors[name] && formik.touched[name]) {
            return formik.errors[name]
        }
        return null
    }
    console.log(checked)

    //get Categories
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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'posts', postId as string)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    const data: IPostProps = docSnap.data() as IPostProps
                    formik.values.title = data.title
                    setContent(data.content as string)
                    setChecked(data.featured as boolean)
                    const docRefC = doc(db, 'categories', data.categoryId)
                    const docSnapC = await getDoc(docRefC)
                    if (docSnapC.exists()) {
                        const currentCategory: OptionType = {
                            id: docSnapC.id,
                            label: capitalizeFirstLetterOfEachWord(docSnapC.data().name),
                            value: capitalizeFirstLetterOfEachWord(docSnapC.data().name)
                        }
                        selectedInputRef.current.setValue(currentCategory)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    }, [])

    return (
        <section className='w-full mb-10'>
            <Heading className='mb-6'>Update Post</Heading>
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
                            <input
                                type='checkbox'
                                id='featured'
                                className='w-5 h-5'
                                checked={checked}
                                onChange={() => {
                                    setChecked(!checked)
                                }}
                            />
                            <Label htmlFor='featured'>Featured post</Label>
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
                                ref={selectedInputRef}
                                onChange={handleSelectedOption}
                                placeholder='Select category for the new post'
                            />
                        </Field>
                        <Field>
                            <Label htmlFor='content'>Content</Label>
                            <div className='w-full bg-light'>
                                <TextEditor content={content} setContent={setContent} />
                            </div>
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
                        Update post
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default UpdatePostPage
