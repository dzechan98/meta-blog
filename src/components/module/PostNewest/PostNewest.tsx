import { useEffect, useState } from 'react'
import { postData } from '../../../data/postData'
import Heading from '../../common/Heading'
import Post from '../../common/Post'
import { IPostProps } from '../../common/Post/Post'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../../../config/firebase'

const PostNewest = () => {
    const [postList, setPostList] = useState<IPostProps[]>([] as IPostProps[])

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
        }
        getListPostRecently()
    }, [])

    return (
        <section className='container mb-20'>
            <Heading className='mb-4'>Recent Post</Heading>
            {postList.length > 0 && (
                <div className='flex items-start justify-between gap-6'>
                    <div className='w-[60%]'>
                        <Post {...postList[0]} isBorder={false} sizeTitle='large' />
                    </div>
                    <div className='w-[40%] flex flex-col gap-3'>
                        {postList
                            .filter((_item, index) => index != 0)
                            ?.map((post) => (
                                <Post
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
            )}
        </section>
    )
}

export default PostNewest
