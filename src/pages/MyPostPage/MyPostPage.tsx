import { useEffect, useState } from 'react'
import Heading from '../../components/common/Heading'
import Post from '../../components/common/Post'
import { useAuth } from '../../contexts/auth-context'
import { collection, deleteDoc, doc, limit, onSnapshot, query, startAfter, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { IPostProps } from '../../components/common/Post/Post'
import Swal from 'sweetalert2'
import LoadingPostCol from '../../components/module/LoadingPostCol'
import Button from '../../components/common/Button'

const MyPostPage = () => {
    const { userInfo } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
    const [myPosts, setMyPosts] = useState<IPostProps[]>([] as IPostProps[])
    const [next, setNext] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(false)
    const [toggle, setToggle] = useState<boolean>(false)
    const [lastVisible, setLastVisible] = useState<any>()

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
            setLoading(true)
            let qPost = query(collection(db, 'posts'), where('userId', '==', userInfo?.uid), limit(3))
            if (next) {
                qPost = query(
                    collection(db, 'posts'),
                    where('userId', '==', userInfo?.uid),
                    startAfter(lastVisible),
                    limit(3)
                )
            }
            onSnapshot(qPost, (querySnapshot) => {
                const myPostsData: IPostProps[] = []
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
                querySnapshot.forEach((docPost) => {
                    myPostsData.push({
                        postId: docPost.id,
                        ...(docPost.data() as IPostProps)
                    })
                })
                setLoading(false)
                setMyPosts([...myPosts, ...myPostsData])
            })
        }
        fetchDataMyPosts()
    }, [toggle])

    useEffect(() => {
        if (next) {
            if (!lastVisible) {
                setDisable(true)
            }
        }
    }, [lastVisible])

    return (
        <section className='w-full mb-10'>
            <Heading className='mb-6'>My Posts</Heading>
            {myPosts.length > 0 && (
                <>
                    <div className='grid grid-cols-3 gap-4 mb-10'>
                        {myPosts?.map((post) => (
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
                            </>
                        )}
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button
                            intent='outline'
                            onClick={() => {
                                setNext(true)
                                setToggle(!toggle)
                            }}
                            disabled={disable}
                        >
                            Load More
                        </Button>
                    </div>
                </>
            )}
            {loading && myPosts.length === 0 && (
                <div className='grid grid-cols-3 gap-4 mb-10'>
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                </div>
            )}

            {!loading && myPosts.length === 0 && (
                <h2 className='text-4xl text-primary font-bold text-center'>My posts is empty</h2>
            )}
        </section>
    )
}

export default MyPostPage
