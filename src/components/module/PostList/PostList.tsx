import Button from '../../common/Button'
import Heading from '../../common/Heading'
import Post from '../../common/Post'
import { IPostProps } from '../../common/Post/Post'

interface IPostListProps {
    heading: string
    listPosts?: IPostProps[]
}
const PostList = ({ heading, listPosts }: IPostListProps) => {
    return (
        <section className='container mb-10'>
            <Heading className='mb-4'>{heading}</Heading>
            <div className='grid grid-cols-3 gap-4 mb-10'>
                {listPosts?.map((post) => <Post key={post.postId} {...post} heightImage='h-[240px]' />)}
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
