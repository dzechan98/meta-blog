import { useNavigate } from 'react-router-dom'
import Field from '../../components/Field'
import Input from '../../components/Input'
import Label from '../../components/Label'
import TogglePassword from '../../components/TogglePassword'
import AuthenticationLayout from '../../layout/AuthenticationLayout'
import Button from '../../components/Button'

const SignUpPage = () => {
    const navigate = useNavigate()
    return (
        <AuthenticationLayout>
            <form>
                <Field>
                    <Label htmlFor='fullname'>Fullname</Label>
                    <Input type='fullname' name='fullname' placeholder='Enter your fullname' outline='primary' />
                </Field>
                <Field>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' placeholder='Enter your email address' outline='primary' />
                </Field>
                <Field>
                    <Label htmlFor='password'>Password</Label>
                    <TogglePassword placeholder='Enter your password' name='password' outline='primary' />
                </Field>
                <Field>
                    <Label htmlFor='confirm-password'>Confirm Password</Label>
                    <TogglePassword placeholder='Enter your password' name='password' outline='primary' />
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
                    <Button type='submit' size='large' disabled>
                        Register
                    </Button>
                </div>
            </form>
        </AuthenticationLayout>
    )
}

export default SignUpPage
