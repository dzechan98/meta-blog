import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import {
    AiOutlineFileText,
    AiOutlinePlusCircle,
    BiCategory,
    GoHome,
    RiContactsLine,
    TbLogout
} from '../../../utils/icons'
import Swal from 'sweetalert2'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../../config/firebase'
import Field from '../Field'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useCategory } from '../../../contexts/category-context'

const menuSidebar = [
    { key: 0, title: 'Dashboard', icons: <GoHome size={25} />, path: '/dashboard/home' },
    { key: 1, title: 'New post', icons: <AiOutlinePlusCircle size={25} />, path: '/dashboard/new-post' },
    { key: 2, title: 'My post', icons: <AiOutlineFileText size={25} />, path: '/dashboard/my-post' },
    { key: 3, title: 'Profile', icons: <RiContactsLine size={25} />, path: '/dashboard/profile' }
]

const active =
    'cursor-pointer shadow-sm shadow-primary flex items-center gap-x-1 px-4 py-2 rounded-lg bg-primary text-light font-medium transition-all'
const notActive =
    'cursor-pointer flex items-cetner gap-x-1 px-4 py-2 rounded-lg text-gray-dark font-medium hover:bg-primary hover:text-light transition-all'

const validationSchema = Yup.object({
    category: Yup.string().required('Please enter the new category')
})

const Sidebar = () => {
    const { checkAddCategory, setCheckAddCategory } = useCategory()
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: {
            category: ''
        },
        validationSchema,
        onSubmit: async ({ category }, { resetForm }) => {
            try {
                const q = query(collection(db, 'categories'), where('name', '==', category.toLocaleLowerCase()))
                const querySnapshot = await getDocs(q)
                let checkExist = false
                querySnapshot.forEach((_doc) => {
                    checkExist = true
                })
                if (checkExist) {
                    formik.errors.category = 'Category already exists'
                } else {
                    try {
                        await addDoc(collection(db, 'categories'), {
                            name: category.toLocaleLowerCase()
                        })
                        toast.success('Add new category successfully!!!')
                        setOpenModal(false)
                        setCheckAddCategory(!checkAddCategory)
                        resetForm()
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {}
        }
    })

    const handleSignOut = (): void => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Sign out!!!'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                navigate('/')
            }
        })
    }
    const getErrorFieldName = (name: 'category') => {
        if (formik.errors[name] && formik.touched[name]) {
            return formik.errors[name]
        }
        return null
    }

    return (
        <div className='w-full h-screen px-4 py-6'>
            <Logo to='/' className='mb-10' />
            <ul className='flex flex-col gap-y-4'>
                {menuSidebar.map((item) => (
                    <li className='text-lg' key={item.key}>
                        <NavLink to={item.path} className={({ isActive }) => (isActive ? active : notActive)}>
                            {item.icons}
                            {item.title}
                        </NavLink>
                    </li>
                ))}
                <li className='text-lg'>
                    <div
                        className={notActive}
                        onClick={() => {
                            setOpenModal(true)
                        }}
                    >
                        <BiCategory size={25} />
                        Add category
                    </div>
                </li>
                <li className='text-lg'>
                    <div className={notActive} onClick={handleSignOut}>
                        <TbLogout size={25} />
                        Logout
                    </div>
                </li>
            </ul>
            {openModal && (
                <div className='fixed inset-0 z-[99] bg-[rgba(0,0,0,0.5)] flex items-center justify-center shadow-lg'>
                    <div className='p-4 rounded-lg bg-light min-w-[400px]'>
                        <h2 className='font-semibold text-primary text-xl mb-2'>Add New Category</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <Field>
                                <Label htmlFor='category'>Category</Label>
                                <Input
                                    name='category'
                                    value={formik.values.category}
                                    error={getErrorFieldName('category')}
                                    placeholder='Please enter the new category'
                                    onChange={formik.handleChange}
                                />
                            </Field>
                            <div className='flex items-center gap-2'>
                                <Button
                                    sizeLoading='small'
                                    type='submit'
                                    loading={!!formik.isSubmitting}
                                    disabled={!!(Object.keys(formik.errors).length || formik.isSubmitting)}
                                >
                                    Submit
                                </Button>
                                <Button
                                    intent='warning'
                                    onClick={() => {
                                        setOpenModal(false)
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar
