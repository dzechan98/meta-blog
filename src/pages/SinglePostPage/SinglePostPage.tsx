import PostImage from '../../components/common/PostImage'
import Category from '../../components/common/Category'
import PostInfo from '../../components/common/PostInfo'
import PostTitle from '../../components/common/PostTitle'
import Text from '../../components/common/Text'
import { postData } from '../../data/postData'
import PostList from '../../components/module/PostList'

const SinglePostPage = () => {
    return (
        <>
            <section className='container mb-10'>
                <Category margin='medium' categoryId={postData.categoryId} />
                <PostTitle size='large'>{postData.title}</PostTitle>
                <PostInfo
                    className='mb-6'
                    avatar={postData.avatar}
                    author={postData.author}
                    date={postData.createdAt?.seconds}
                />
                <PostImage imageURL={postData.imageURL} className='mb-6' />
                <Text>{postData.description}</Text>
                <Text>{postData.description}</Text>
                <Text>{postData.description}</Text>
                <Text>{postData.description}</Text>
                <Text>{postData.description}</Text>
                <PostImage imageURL={postData.imageURL} className='mb-6' />
                <Text>{postData.description}</Text>
                <Text>{postData.description}</Text>
            </section>
            <PostList heading='Related Post' />
        </>
    )
}

export default SinglePostPage
