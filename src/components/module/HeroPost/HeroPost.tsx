import PostImage from '../../common/PostImage'
import Category from '../../common/Category'
import { IPostProps } from '../../common/Post/Post'
import PostInfo from '../../common/PostInfo'
import PostTitle from '../../common/PostTitle'
import Heading from '../../common/Heading'

const HeroPost = ({ imageURL, title, category, date, avatar, author }: IPostProps) => {
    return (
        <section className='container mb-[120px]'>
            <Heading className='mb-6'>Hero Post</Heading>
            <div className='relative w-full duration-300'>
                <PostImage imageURL={imageURL} />
                <div className='absolute bg-light rounded-lg shadow-lg w-[400px] p-4 left-10 -bottom-10'>
                    <Category>{category}</Category>
                    <PostTitle size='large'>{title}</PostTitle>
                    <PostInfo author={author} date={date} avatar={avatar} />
                </div>
            </div>
        </section>
    )
}

export default HeroPost
