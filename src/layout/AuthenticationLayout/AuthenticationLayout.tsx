import Logo from '../../components/common/Logo'

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='container py-[150px] flex flex-col items-center justify-center'>
            <div className='w-[600px]'>
                <div className='flex items-center justify-center mb-10'>
                    <Logo to='/' size='large' />
                </div>
                {children}
            </div>
        </section>
    )
}

export default AuthenticationLayout
