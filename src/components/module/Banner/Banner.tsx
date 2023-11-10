import Logo from '../../common/Logo'
import bannerImage from '../../../assets/img/banner.png'
import Button from '../../common/Button'

const Banner = () => {
    return (
        <div className='bg-gradient-to-r from-primary to-secondary py-20 mb-10'>
            <div className='container flex justify-between'>
                <div className='w-[50%] text-white'>
                    <Logo size='large' className='mb-10' />
                    <p className='leading-8 mb-10'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio at sequi excepturi aperiam natus
                        totam distinctio voluptates fugiat itaque ut vitae, alias rem sunt asperiores, animi nulla
                        molestias ad! Aut!
                    </p>
                    <Button intent='light' size='large' to='/sign-up'>
                        Get started
                    </Button>
                </div>
                <div className='w-[40%]'>
                    <img src={bannerImage} alt='banner' className='w-[420px]' />
                </div>
            </div>
        </div>
    )
}

export default Banner
