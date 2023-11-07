import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Input from '../../components/Input'
import Label from '../../components/Label'
import TogglePassword from '../../components/TogglePassword'
import AuthenticationLayout from '../../layout/AuthenticationLayout'

//bg-gradient-to-r from-primary to-secondary
const SignInPage = () => {
    const navigate = useNavigate()
    return (
        <AuthenticationLayout>
            <form>
                <Field>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' placeholder='Enter your email address' outline='primary' />
                </Field>
                <Field>
                    <Label htmlFor='password'>Password</Label>
                    <TogglePassword placeholder='Enter your password' name='password' outline='primary' />
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
                    <Button type='submit' size='large' disabled>
                        Login
                    </Button>
                </div>
            </form>
        </AuthenticationLayout>
    )
}

export default SignInPage
