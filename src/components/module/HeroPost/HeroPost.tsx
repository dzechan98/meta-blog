import PostImage from '../../common/PostImage'
import Category from '../../common/Category'
import { IPostProps } from '../../common/Post/Post'
import PostInfo from '../../common/PostInfo'
import PostTitle from '../../common/PostTitle'
import Heading from '../../common/Heading'
import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import LoadingHeroPost from '../LoadingHeroPost'

const HeroPost = () => {
    const [postList, setPostList] = useState<IPostProps[]>([] as IPostProps[])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchPostList = async () => {
            const q = query(collection(db, 'posts'), orderBy('createdAt'), limit(1))
            const querySnapshot = await getDocs(q)
            const data: IPostProps[] = []
            querySnapshot.forEach((doc) => {
                data.push({ postId: doc.id, ...(doc.data() as IPostProps) })
            })
            setPostList(data)
            setLoading(false)
        }
        fetchPostList()
    }, [])
    return (
        <section className='container mb-[120px]'>
            <Heading className='mb-6'>Hero Post</Heading>
            {loading && <LoadingHeroPost />}
            {!loading &&
                postList.length > 0 &&
                postList.map((post) => (
                    <div className='relative w-full duration-300' key={post.postId}>
                        <PostImage imageURL={post?.imageURL} height='h-[480px]' to={`/post/${post.postId}`} />
                        <div className='absolute bg-light rounded-lg shadow-lg w-[400px] p-4 left-10 -bottom-10'>
                            <Category categoryId={post?.categoryId} />
                            <PostTitle size='large'>{post?.title}</PostTitle>
                            <PostInfo author={post?.author} date={post?.createdAt?.seconds} avatar={post?.avatar} />
                        </div>
                    </div>
                ))}
        </section>
    )
}

export default HeroPost
