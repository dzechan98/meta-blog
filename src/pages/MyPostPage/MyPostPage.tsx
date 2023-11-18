import { useEffect, useState } from 'react'
import Heading from '../../components/common/Heading'
import Post from '../../components/common/Post'
import { useAuth } from '../../contexts/auth-context'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { IPostProps } from '../../components/common/Post/Post'
import Swal from 'sweetalert2'
import LoadingPostCol from '../../components/module/LoadingPostCol'

const MyPostPage = () => {
    const { userInfo } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
    const [myPosts, setMyPosts] = useState<IPostProps[]>([] as IPostProps[])

    const handleDeletePost = (postId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!!!'
        }).then(async (result) => {
            console.log(postId)
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, 'posts', postId))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    useEffect(() => {
        const fetchDataMyPosts = async () => {
            const qPost = query(collection(db, 'posts'), where('userId', '==', userInfo?.uid))

            onSnapshot(qPost, (querySnapshot) => {
                const myPostsData: IPostProps[] = []
                querySnapshot.forEach((docPost) => {
                    myPostsData.push({
                        postId: docPost.id,
                        ...(docPost.data() as IPostProps)
                    })
                })
                setLoading(false)
                setMyPosts(myPostsData)
            })
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
                            lineCamp='base'
                            heightImage='h-[260px]'
                            hideButtonLike
                            action
                            handleDeletePost={handleDeletePost}
                        />
                    ))}
                {loading && (
                    <>
                        <LoadingPostCol />
                        <LoadingPostCol />
                        <LoadingPostCol />
                        <LoadingPostCol />
                        <LoadingPostCol />
                        <LoadingPostCol />
                    </>
                )}
            </div>
            {!loading && myPosts.length === 0 && (
                <h2 className='text-4xl text-primary font-bold text-center'>My posts is empty</h2>
            )}
        </section>
    )
}

export default MyPostPage
