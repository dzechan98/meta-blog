import Logo from '../../components/Logo'

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-screen h-screen '>
            <div className='container py-[150px] flex flex-col items-center justify-center'>
                <div className='w-[600px]'>
                    <div className='flex items-center justify-center mb-10'>
                        <Logo to='/' size='large' />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthenticationLayout
