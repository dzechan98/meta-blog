import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Input from '../../components/Input'
import Label from '../../components/Label'
import TogglePassword from '../../components/TogglePassword'
import AuthenticationLayout from '../../layout/AuthenticationLayout'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'

//bg-gradient-to-r from-primary to-secondary
export interface IFormDataSignIn {
    email: string
    password: string
}
const validationSchema = Yup.object({
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
        .required('Please enter your password')
})

const SignInPage = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values: IFormDataSignIn) => {
            const { email, password } = values
            try {
                await signInWithEmailAndPassword(auth, email, password)
                navigate('/')
            } catch (error) {
                formik.errors.password = 'The username or password is incorrect'
                console.log(error)
            }
        }
    })

    const getErrorFieldName = (name: 'email' | 'password') => {
        if (formik.errors[name] && formik.touched[name]) {
            return formik.errors[name]
        }
        return null
    }

    return (
        <AuthenticationLayout>
            <form onSubmit={formik.handleSubmit}>
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

                <h2 className='font-semibold mb-10'>
                    You have not had an account?{' '}
                    <span
                        className='text-primary cursor-pointer'
                        onClick={() => {
                            navigate('/sign-up')
                        }}
                    >
                        Register
                    </span>
                </h2>
                <div className='flex items-center justify-center'>
                    <Button
                        type='submit'
                        size='large'
                        loading={!!formik.isSubmitting}
                        disabled={!!(Object.keys(formik.errors).length || formik.isSubmitting)}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </AuthenticationLayout>
    )
}

export default SignInPage
