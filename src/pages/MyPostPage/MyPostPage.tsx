import { useEffect, useState } from 'react'
import Heading from '../../components/common/Heading'
import Post from '../../components/common/Post'
import { useAuth } from '../../contexts/auth-context'
import { DocumentData, QuerySnapshot, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { IPostProps } from '../../components/common/Post/Post'
import LoadingPost from '../../components/module/LoadingPost'

const MyPostPage = () => {
    const { userInfo } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
    const [myPosts, setMyPosts] = useState<IPostProps[]>([] as IPostProps[])

    useEffect(() => {
        const fetchDataMyPosts = async () => {
            const qPost = query(collection(db, 'posts'), where('userId', '==', userInfo?.uid))
            try {
                const querySnapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(qPost)
                const myPostsData: IPostProps[] = []

                for (const docPost of querySnapshot.docs) {
                    myPostsData.push({
                        postId: docPost.id,
                        ...(docPost.data() as IPostProps)
                    })
                }
                setLoading(false)
                setMyPosts(myPostsData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataMyPosts()
    }, [])
    console.log(myPosts)
    return (
        <section className='w-full mb-10'>
            <Heading className='mb-6'>My Posts</Heading>
            <div className='grid grid-cols-3 gap-4'>
                {!loading &&
                    myPosts.length > 0 &&
                    myPosts.map((post: IPostProps) => (
                        <Post
                            {...post}
                            key={post.postId}
                            backgroundColor='light'
                            heightImage='h-[260px]'
                            hideButtonLike
                        />
                    ))}
                {loading && <LoadingPost />}
            </div>
            {!loading && myPosts.length === 0 && (
                <h2 className='text-4xl text-primary font-bold text-center'>My posts is empty</h2>
            )}
        </section>
    )
}

export default MyPostPage
