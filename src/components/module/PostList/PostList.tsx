import { postData } from '../../../data/postData'
import Button from '../../common/Button'
import Heading from '../../common/Heading'
import Post from '../../common/Post'

interface IPostListProps {
    heading: string
}
const PostList = ({ heading }: IPostListProps) => {
    return (
        <section className='container mb-10'>
            <Heading className='mb-4'>{heading}</Heading>
            <div className='grid grid-cols-3 gap-4 mb-10'>
                <Post {...postData} heightImage='h-[240px]' />
                <Post {...postData} heightImage='h-[240px]' />
                <Post {...postData} heightImage='h-[240px]' />
                <Post {...postData} heightImage='h-[240px]' />
                <Post {...postData} heightImage='h-[240px]' />
                <Post {...postData} heightImage='h-[240px]' />
            </div>
            <div className='flex items-center justify-center'>
                <Button intent='outline' size='large'>
                    View All Post
                </Button>
            </div>
        </section>
    )
}

export default PostList
