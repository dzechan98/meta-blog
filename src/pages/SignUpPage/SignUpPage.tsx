import { useNavigate } from 'react-router-dom'
import Field from '../../components/common/Field'
import Input from '../../components/common/Input'
import Label from '../../components/common/Label'
import TogglePassword from '../../components/common/TogglePassword'
import AuthenticationLayout from '../../layout/AuthenticationLayout'
import Button from '../../components/common/Button'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import slugify from 'slugify'
import { toast } from 'react-toastify'
import { IFormDataSignIn } from '../SignInPage/SignInPage'

interface IFormDataSignUp extends IFormDataSignIn {
    fullname: string
    confirmPassword: string
}

const validationSchema = Yup.object({
    fullname: Yup.string().required('Please enter your fullname'),
    email: Yup.string()
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter valid email address'
        )
        .required('Please enter your email'),
    password: Yup.string()
        .min(8, 'Must Contain 8 Characters')
        .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
        .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
        .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
        .matches(/^(?=.*[!@#\$%\^&\*])/, '  Must Contain  One Special Case Character')
        .required('Please enter your password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Password's not match")
        .required('Please enter your confirm password')
})

const SignUpPage = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: IFormDataSignUp) => {
            const { fullname, email, password } = values
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(userCredential.user, {
                    displayName: fullname,
                    photoURL: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
                })
                console.log(userCredential)
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    ...values,
                    role: 'User',
                    status: 'Active',
                    username: slugify(fullname, { lower: true }),
                    createdAt: serverTimestamp()
                })
                toast.success('Register successfully!!!')
                navigate('/')
            } catch (error) {
                console.log(error)
                formik.errors.email = 'This email address is already registered'
            }
        }
    })

    const getErrorFieldName = (name: 'fullname' | 'email' | 'password' | 'confirmPassword') => {
        if (formik.errors[name] && formik.touched[name]) {
            return formik.errors[name]
        }
        return null
    }

    return (
        <AuthenticationLayout>
            <form onSubmit={formik.handleSubmit}>
                <Field>
                    <Label htmlFor='fullname'>Fullname</Label>
                    <Input
                        type='fullname'
                        name='fullname'
                        placeholder='Enter your fullname'
                        outline='primary'
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getErrorFieldName('fullname')}
                    />
                </Field>
                <Field>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        type='email'
                        name='email'
                        placeholder='Enter your email address'
                        outline='primary'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getErrorFieldName('email')}
                    />
                </Field>
                <Field>
                    <Label htmlFor='password'>Password</Label>
                    <TogglePassword
                        placeholder='Enter your password'
                        name='password'
                        outline='primary'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getErrorFieldName('password')}
                    />
                </Field>
                <Field>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <TogglePassword
                        placeholder='Enter your password'
                        name='confirmPassword'
                        outline='primary'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getErrorFieldName('confirmPassword')}
                    />
                </Field>

                <h2 className='font-semibold mb-10'>
                    You already have an account?{' '}
                    <span
                        className='text-primary cursor-pointer'
                        onClick={() => {
                            navigate('/sign-in')
                        }}
                    >
                        Login
                    </span>
                </h2>
                <div className='flex items-center justify-center'>
                    <Button
                        type='submit'
                        size='large'
                        loading={!!formik.isSubmitting}
                        disabled={!!(Object.keys(formik.errors).length || formik.isSubmitting)}
                    >
                        Register
                    </Button>
                </div>
            </form>
        </AuthenticationLayout>
    )
}

export default SignUpPage
