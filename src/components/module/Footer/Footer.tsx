import { AiOutlineMail } from 'react-icons/ai'
import Logo from '../../common/Logo'
import Input from '../../common/Input'
import Button from '../../common/Button'

const Footer = () => {
    return (
        <div className='pt-10 bg-[#f6f6f7]'>
            <div className='container'>
                <div className='flex items-start justify-between mb-10'>
                    <div className='w-[30%] text-gray-dark'>
                        <h2 className='text-dark font-medium mb-5'>About</h2>
                        <p className='mb-5'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                        <p className='mb-3'>
                            <span className='text-dark font-medium'>Email:</span> <span> info@jstemplate.net</span>
                        </p>
                        <p>
                            <span className='text-dark font-medium'>Phone:</span> <span> 880 123 456 789</span>
                        </p>
                    </div>
                    <div className='w-[15%] text-gray-dark'>
                        <h2 className='text-dark font-medium mb-5'>Quick Link</h2>
                        <div className='flex flex-col gap-y-3'>
                            <span>Home</span>
                            <span>About</span>
                            <span>Blog</span>
                            <span>Archived</span>
                            <span>Author</span>
                            <span>Contact</span>
                        </div>
                    </div>
                    <div className='w-[15%] text-gray-dark'>
                        <h2 className='text-dark font-medium mb-5'>Category</h2>
                        <div className='flex flex-col gap-y-3'>
                            <span>Lifestyle</span>
                            <span>Technology</span>
                            <span>Travel</span>
                            <span>Business</span>
                            <span>Economy</span>
                            <span>Sports</span>
                        </div>
                    </div>
                    <div className='w-[30%] px-6 py-4 bg-light rounded-lg shadow-lg flex flex-col items-center'>
                        <h2 className='text-lg text-dark font-semibold'>Weekly Newsletter</h2>
                        <p className='text-gray-dark mb-5'>Get blog articles and offers via email</p>
                        <Input placeholder='Your Email'>
                            <AiOutlineMail size={20} />
                        </Input>
                        <Button className='mt-4 w-full'>Subscribe</Button>
                    </div>
                </div>
                <div className='py-5 flex justify-between items-center border-t border-t-gray-light'>
                    <div className='footer-logo'>
                        <Logo className='mb-2' to='/' />
                        <p className='text-gray-dark'>© JS Template 2023. All Rights Reserved.</p>
                    </div>
                    <div className='flex items-center gap-6'>
                        <span className='relative after:absolute after:w-[1px] after:h-full after:bg-gray-500 after:-right-3'>
                            Terms of Use
                        </span>
                        <span className='relative after:absolute after:w-[1px] after:h-full after:bg-gray-500 after:-right-3'>
                            Privacy Policy
                        </span>
                        <span>Cookie Policy</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
