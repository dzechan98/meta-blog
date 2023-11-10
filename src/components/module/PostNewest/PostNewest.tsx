import { postData } from '../../../data/postData'
import Heading from '../../common/Heading'
import Post from '../../common/Post'

const PostNewest = () => {
    return (
        <section className='container mb-20'>
            <Heading className='mb-4'>Recent Post</Heading>
            <div className='flex items-start justify-between gap-6'>
                <div className='w-[60%]'>
                    <Post {...postData} isBorder={false} sizeTitle='large' />
                </div>
                <div className='w-[40%] flex flex-col gap-3'>
                    <Post
                        {...postData}
                        widthImage='w-[100%]'
                        isBorder={false}
                        direction='row'
                        sizeTitle='base'
                        sizeCategory='base'
                        lineCamp='base'
                        hidePostInfo={true}
                    />
                    <Post
                        {...postData}
                        widthImage='w-[100%]'
                        isBorder={false}
                        direction='row'
                        sizeTitle='base'
                        sizeCategory='base'
                        lineCamp='base'
                        hidePostInfo={true}
                    />
                    <Post
                        {...postData}
                        widthImage='w-[100%]'
                        isBorder={false}
                        direction='row'
                        sizeTitle='base'
                        sizeCategory='base'
                        lineCamp='base'
                        hidePostInfo={true}
                    />
                    <Post
                        {...postData}
                        widthImage='w-[100%]'
                        isBorder={false}
                        direction='row'
                        sizeTitle='base'
                        sizeCategory='base'
                        lineCamp='base'
                        hidePostInfo={true}
                    />
                </div>
            </div>
        </section>
    )
}

export default PostNewest
