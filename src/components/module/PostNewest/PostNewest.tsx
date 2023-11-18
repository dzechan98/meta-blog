import { useEffect, useState } from 'react'
import Heading from '../../common/Heading'
import Post from '../../common/Post'
import { IPostProps } from '../../common/Post/Post'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import LoadingPostRow from '../LoadingPostRow'
import LoadingPostCol from '../LoadingPostCol'

const PostNewest = () => {
    const [postList, setPostList] = useState<IPostProps[]>([] as IPostProps[])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getListPostRecently = async () => {
            const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(5))
            const querySnapshot = await getDocs(q)
            const data: IPostProps[] = []
            querySnapshot.forEach((doc) => {
                data.push({
                    postId: doc.id,
                    ...(doc.data() as IPostProps)
                })
            })
            setPostList(data)
            setLoading(false)
        }
        getListPostRecently()
    }, [])

    return (
        <section className='container mb-20'>
            <Heading className='mb-4'>Recent Post</Heading>
            <div className='w-full flex items-start justify-between gap-6'>
                <div className='w-[60%]'>
                    {loading && <LoadingPostCol heightImage={480} />}
                    {!loading && postList.length > 0 && (
                        <Post {...postList[0]} isBorder={false} sizeTitle='large' heightImage='h-[480px]' />
                    )}
                </div>
                <div className='w-[40%] flex flex-col gap-2'>
                    {loading && (
                        <>
                            <LoadingPostRow />
                            <LoadingPostRow />
                            <LoadingPostRow />
                            <LoadingPostRow />
                        </>
                    )}
                    {!loading &&
                        postList.length > 0 &&
                        postList
                            .filter((_item, index) => index != 0)
                            ?.map((post) => (
                                <Post
                                    key={post.postId}
                                    {...post}
                                    widthImage='w-[200px]'
                                    heightImage='h-[120px]'
                                    isBorder={false}
                                    direction='row'
                                    sizeTitle='base'
                                    sizeCategory='base'
                                    lineCamp='base'
                                    hidePostInfo={true}
                                />
                            ))}
                </div>
            </div>
        </section>
    )
}

export default PostNewest
