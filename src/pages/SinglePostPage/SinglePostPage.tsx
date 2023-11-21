import Category from '../../components/common/Category'
import PostInfo from '../../components/common/PostInfo'
import PostTitle from '../../components/common/PostTitle'
import PostList from '../../components/module/PostList'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { IPostProps } from '../../components/common/Post/Post'
import LoadingPostDetail from '../../components/module/LoadingPostDetail'
import PostImage from '../../components/common/PostImage'

const SinglePostPage = () => {
    const { postId } = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [post, setPost] = useState<IPostProps>({} as IPostProps)
    const [listPostRelated, setListPostRelated] = useState<IPostProps[]>([] as IPostProps[])

    useEffect(() => {
        const fetchDetailPost = async () => {
            const docRef = doc(db, 'posts', postId as string)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setPost({
                    postId,
                    ...(docSnap.data() as IPostProps)
                })
                setLoading(false)
            }
        }

        if (postId) {
            fetchDetailPost()
        }
    }, [])

    useEffect(() => {
        const fetchListPostRelated = async () => {
            try {
                const q = query(collection(db, 'posts'), where('categoryId', '==', post.categoryId))
                const querySnapshot = await getDocs(q)
                const data: IPostProps[] = []
                querySnapshot.forEach((doc) => {
                    data.push({ postId: doc.id, ...(doc.data() as IPostProps) })
                })
                setListPostRelated(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListPostRelated()
    }, [post])

    console.log(post)
    return (
        <>
            {!loading && post?.title && (
                <>
                    <section className='container mb-10'>
                        <Category margin='medium' categoryId={post?.categoryId} />
                        <PostTitle size='large'>{post.title}</PostTitle>
                        <PostInfo
                            className='mb-6'
                            avatar={post?.avatar}
                            author={post?.author}
                            date={post?.createdAt?.seconds}
                        />
                        <PostImage imageURL={post?.imageURL} height='max-h-[600px]' className='mb-10' />
                        {post?.content && <div className='w full content'>{parse(String(post.content))}</div>}
                    </section>
                    {listPostRelated.length > 0 && <PostList heading='Related Post' listPosts={listPostRelated} />}
                </>
            )}
            {loading && <LoadingPostDetail />}
        </>
    )
}

export default SinglePostPage
